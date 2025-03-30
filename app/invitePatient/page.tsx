import { InvitePatientForm } from "@/components/InvitePatientForm";
import { StrokeeLogo } from "@/components/StrokeeLogo";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <main className="min-h-screen bg-white p-4">
      {/* Header */}
      {/* <SettingsMenu /> */}
      <div className="text-customRed mt-4 ml-4">
        <Link href="/dashboard">
          <ArrowBigLeft size={48} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
        <StrokeeLogo />
        <InvitePatientForm />
      </div>
    </main>
  );
}
