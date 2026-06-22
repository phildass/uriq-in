"use client";

import { useState } from "react";
import { sendForgotPasswordOtpBySms } from "@/lib/auth/forgot-password";
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

type ForgotPasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPhone?: string;
};

export function ForgotPasswordDialog({
  open,
  onOpenChange,
  defaultPhone = "",
}: ForgotPasswordDialogProps) {
  const [phone, setPhone] = useState(defaultPhone);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    setStatus(null);
    const result = await sendForgotPasswordOtpBySms(phone);
    setStatus(result.message);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            We will send a one-time passcode to your registered mobile number.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="forgot-phone">Phone</Label>
            <Input
              id="forgot-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          <Button
            type="button"
            className="w-full uppercase tracking-wide"
            onClick={handleSendOtp}
            disabled={loading || !phone.trim()}
          >
            Forgot password | Send me OTP by SMS
          </Button>
          {status ? <p className="text-xs text-base-muted">{status}</p> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
