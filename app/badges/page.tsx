"use client";

import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { BadgeWall } from "@/components/badges/badge-wall";
import { Button } from "@/components/ui/button";

export default function BadgesPage() {
  return (
    <MobileShell>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Badge Wall</h1>
        <Link href="/">
          <Button variant="ghost" className="px-2 py-1 text-xs">
            Home
          </Button>
        </Link>
      </div>
      <BadgeWall />
    </MobileShell>
  );
}
