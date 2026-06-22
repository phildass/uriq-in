import MobileShell from "@/components/layout/mobile-shell";
import { GuestProfileCard } from "@/components/profile/guest-profile-card";
import { FullProfileSection } from "@/components/profile/full-profile-section";

export default function ProfilePage() {
  return (
    <MobileShell>
      <header className="mb-4 space-y-1">
        <h1 className="text-2xl font-semibold text-base-text">Profile</h1>
        <p className="text-sm text-base-muted">Guest progress and full account details</p>
      </header>
      <div className="space-y-4">
        <GuestProfileCard />
        <FullProfileSection />
      </div>
    </MobileShell>
  );
}
