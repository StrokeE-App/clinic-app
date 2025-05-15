import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsMenu from '@/components/SettingsMenu';
import {useAuth} from '@/context/AuthContext';
import { SignOut } from '@/firebase/config';

// Mock the AuthContext
jest.mock('@/context/AuthContext', () => ({
	useAuth: jest.fn(),
}));

jest.mock('@/firebase/config', () => ({
	SignOut: jest.fn(),
}));

jest.mock('@/hooks/useNotifications', () => ({
	useNotifications: jest.fn(() => ({
		isSubscribed: true,
		error: null,
		subscribe: jest.fn(),
		unsubscribe: jest.fn(),
	})),
}));

describe('SettingsMenu', () => {
	beforeEach(() => {
		jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
			user: {uid: 'test-user-id'}, // Puedes ajustar esto según lo que tu componente espera
		});

	});

	it('should render the menu button', () => {

		render(<SettingsMenu />);

		// expect(screen.getByRole('span')).toBeInTheDocument();
		expect(screen.getAllByRole('button')[1]).toHaveClass('text-customRed');
	});

	it('should render the menu items when clicked', async() => {

		const user = userEvent.setup();
		render(<SettingsMenu />);

		// Abre el panel lateral
		await user.click(screen.getByText('Configuración'));

		// Ahora el botón "Cerrar sesión" debe ser visible
		const logoutButton = await screen.findByText('Cerrar sesión');
		await user.click(logoutButton);

		expect(SignOut).toHaveBeenCalled();
	});

	it('should maintain consistent styling', () => {

		const {container} = render(<SettingsMenu />);

		// Check if the container has the correct classes
		expect(container.firstChild).toHaveClass('flex', 'items-center', 'gap-2', 'text-customRed', 'cursor-pointer', 'z-20');
	});
});
