"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ForgotPasswordDialog } from "@/components/auth/forgot-password-dialog";
import { PasswordInput } from "@/components/auth/password-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ProfileRow } from "@/lib/types/profile";
import { fetchProfileByUserId } from "@/lib/supabase/profiles";
import { createSupabaseClient } from "@/lib/supabase/client";

export function FullProfileSection() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [password, setPassword] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) {
        const row = await fetchProfileByUserId(data.user.id);
        setProfile(row);
      }
    });
  }, []);

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Full profile</CardTitle>
          <CardDescription>Log in to view and edit your account details.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Full profile</CardTitle>
          <CardDescription>Details from your Supabase profiles row.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="profile-first">First name</Label>
              <Input id="profile-first" readOnly value={profile?.first_name ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-last">Last name</Label>
              <Input id="profile-last" readOnly value={profile?.last_name ?? ""} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-phone">Phone</Label>
            <Input id="profile-phone" readOnly value={profile?.phone ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" readOnly value={profile?.email ?? user.email ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-password">Password</Label>
            <PasswordInput
              id="profile-password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <p className="text-xs text-base-muted">
              Password change will be enabled when auth settings are configured.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full text-xs font-semibold uppercase tracking-wide"
            onClick={() => setForgotOpen(true)}
          >
            FORGOT PASSWORD | SEND ME OTP BY SMS
          </Button>
        </CardContent>
      </Card>
      <ForgotPasswordDialog
        open={forgotOpen}
        onOpenChange={setForgotOpen}
        defaultPhone={profile?.phone ?? ""}
      />
    </>
  );
}
