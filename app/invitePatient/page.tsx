import { InvitePatientForm } from "@/components/InvitePatientForm";
import SettingsMenu from "@/components/SettingsMenu";
import { StrokeeLogo } from "@/components/StrokeeLogo";

export default function page() {
  return (
        <main className="min-h-screen bg-white p-4">
          {/* Header */}
          <SettingsMenu />
  
          {/* Main Content */}
          <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
            <StrokeeLogo />
            <InvitePatientForm />
          </div>
        </main>
      );
}
