'use client';

import {useState} from 'react';
import {SignIn} from '@/firebase/config';
import toast from 'react-hot-toast';

export function EditProfileForm() {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		const loadingToast = toast.loading('Iniciando sesión...');

		try {
			await SignIn(userName, password);
			toast.success('¡Bienvenido!', {id: loadingToast});
		} catch {
			toast.error('Usuario o contraseña incorrectos', {id: loadingToast});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
			<div className="space-y-4">
				<div>
					<input
						type="text"
						placeholder="Nombre"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
        <div>
					<input
						type="email"
						placeholder="Email"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Contraseña actual"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
        <div>
					<input
						type="password"
						placeholder="Nueva Contraseña"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
        <div>
					<input
						type="password"
						placeholder="Confirmar Contraseña"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
						required
					/>
				</div>
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className="w-full px-4 py-3 text-white bg-customRed rounded-full hover:bg-gustomRed focus:outline-none focus:ring-2 focus:ring-customRed focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? 'Cargando...' : 'Guardar Cambios'}
			</button>
		</form>
	);
}
