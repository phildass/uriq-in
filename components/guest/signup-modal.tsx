"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SignupModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scorePercent: number;
};

export function SignupModal({ open, onOpenChange, scorePercent }: SignupModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Great score — {scorePercent}%</DialogTitle>
          <DialogDescription>
            Want to save your progress and unlock the full Career Analytics dashboard? Sign up
            in about 10 seconds. Your guest results stay on this device until you create an
            account.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href="/signup"
            className="flex w-full items-center justify-center rounded-xl bg-module-logic px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            onClick={() => onOpenChange(false)}
          >
            Sign up & save progress
          </Link>
          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm font-medium text-base-text transition hover:bg-zinc-50"
            onClick={() => onOpenChange(false)}
          >
            Preview dashboard (guest)
          </Link>
          <button
            type="button"
            className="py-2 text-xs text-base-muted"
            onClick={() => onOpenChange(false)}
          >
            Continue as guest
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
