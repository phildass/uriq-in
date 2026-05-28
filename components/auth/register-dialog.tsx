"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { exportGuestForMerge, getGuestProfile } from "@/lib/guest/storage";
import { upsertProfileClient } from "@/lib/supabase/profiles";
import { createSupabaseClient } from "@/lib/supabase/client";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
};

export function RegisterDialog({
  open,
  onOpenChange,
  onSuccess,
  onSwitchToLogin,
}: RegisterDialogProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createSupabaseClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
        },
      },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      await upsertProfileClient({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
      });

      const guest = getGuestProfile();
      if (guest) {
        void fetch("/api/guest/merge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exportGuestForMerge(guest)),
        });
      }
    }

    setLoading(false);
    setMessage(
      data.session ?
        "Account created. You are now signed in."
      : "Check your email to confirm your account, then log in."
    );

    if (data.session) {
      onOpenChange(false);
      onSuccess?.();
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Create your uriq.in profile in seconds.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="reg-first">First name</Label>
              <Input
                id="reg-first"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-last">Last name</Label>
              <Input
                id="reg-last"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-phone">Phone</Label>
            <Input
              id="reg-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-email">Email</Label>
            <Input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-password">Password</Label>
            <PasswordInput
              id="reg-password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
            />
          </div>
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
          {message ? <p className="text-xs text-base-muted">{message}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </Button>
          <button
            type="button"
            className="w-full text-center text-xs text-base-muted"
            onClick={() => {
              onOpenChange(false);
              onSwitchToLogin?.();
            }}
          >
            Already have an account? Log in
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
