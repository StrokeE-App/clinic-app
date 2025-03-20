'use client';

import apiClient from '@/api/apiClient';
import {useState} from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

type LoginFormProps = {
	placeholder?: string;
};

export function InvitePatientForm({placeholder = 'Email'}: LoginFormProps) {
	const [userEmail, setUserEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

  const {user} = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
    if (!user) return;
		setIsLoading(true);
		const loadingToast = toast.loading('Enviando invitación...');

		try {
			await apiClient.post('/healthCenter/invite-patient', {
        email: userEmail,
        medicId: user.uid
      });
			toast.success('Paciente registrado correctamente', {id: loadingToast});
		} catch {
			toast.error('Se produjo un error al hacer la invitación, por favor intente más tarde', {id: loadingToast});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
			<div className="space-y-4">
					<input
						type="email"
						placeholder={placeholder}
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className="w-full px-4 py-3 text-white bg-customRed rounded-full hover:bg-gustomRed focus:outline-none focus:ring-2 focus:ring-customRed focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? 'Cargando...' : 'Enviar invitación'}
			</button>
		</form>
	);
}
