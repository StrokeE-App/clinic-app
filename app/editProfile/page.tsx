"use client";

import { useEffect, useState } from "react";
import { StrokeeLogo } from "@/components/StrokeeLogo";
import { EditProfileForm } from "@/components/EditProfileForm";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <main>
      <div className="text-customRed mt-4 ml-4">
        <Link href="/dashboard">
          <ArrowBigLeft size={48} />
        </Link>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <StrokeeLogo />

      {isLoading ? (
        <div className="w-6 h-6 border-2 border-customRed border-t-transparent rounded-full animate-spin" />
      ) : (
        <EditProfileForm />
      )}
    </div>
    </main>
  );
}
