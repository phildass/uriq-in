"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { LoginDialog } from "@/components/auth/login-dialog";
import { RegisterDialog } from "@/components/auth/register-dialog";
import { LanguagePicker } from "@/components/language/language-picker";
import { Button, buttonVariants } from "@/components/ui/button";
import { createSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";

type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseClient();

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-[var(--site-banner-h)] z-40 border-b border-surface-border/60 backdrop-blur-md",
          className
        )}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-2 px-4 py-2.5 bg-white/70">
          <Link href="/" className="leading-tight">
            <span className="block text-sm font-semibold text-base-text">uriq.in</span>
            <span className="block text-[10px] font-medium text-indigo-600">Your IQ</span>
          </Link>
          <nav className="flex items-center gap-1.5">
            <LanguagePicker />
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              My Dashboard
            </Link>
            {user ?
              <Button variant="outline" size="sm" type="button" onClick={handleSignOut}>
                Log out
              </Button>
            : <>
                <Button variant="outline" size="sm" type="button" onClick={() => setLoginOpen(true)}>
                  Log In
                </Button>
                <Button size="sm" type="button" onClick={() => setRegisterOpen(true)}>
                  Register
                </Button>
              </>
            }
          </nav>
        </div>
      </header>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToRegister={() => setRegisterOpen(true)}
      />
      <RegisterDialog
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </>
  );
}
