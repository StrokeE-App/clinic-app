'use client';

import {useEffect,useState} from 'react';
import {StrokeeLogo} from '@/components/StrokeeLogo';
import { EditProfileForm } from '@/components/editProfileForm';

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
			<StrokeeLogo />

			{isLoading ? (
				<div className="w-6 h-6 border-2 border-customRed border-t-transparent rounded-full animate-spin" />
			) : (
				<EditProfileForm />
			)}
		</main>
	);
}
