import {render, screen} from '@testing-library/react';
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
describe('SettingsMenu', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render the menu button', () => {

		render(<SettingsMenu />);

		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveClass('text-customRed');
	});

	it('should render the menu items when clicked', () => {

		render(<SettingsMenu />);

		const button = screen.getByText('Cerrar sesión');
		button.click();

		expect(SignOut).toHaveBeenCalled();
	});

	it('should maintain consistent styling', () => {

		const {container} = render(<SettingsMenu />);

		// Check if the container has the correct classes
		expect(container.firstChild).toHaveClass('flex', 'items-center', 'gap-2', 'text-customRed', 'cursor-pointer', 'z-20');
	});
});
