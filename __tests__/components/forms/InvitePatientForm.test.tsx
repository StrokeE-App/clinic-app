import { InvitePatientForm } from '@/components/InvitePatientForm';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';

// Mock modules
jest.mock('@/firebase/config', () => ({
  SignIn: jest.fn(),
}));

jest.mock('@/api/apiClient', () => ({
  post: jest.fn(),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      uid: 'mock-user-id',
    },
  }),
}));
// Create mock functions that we can reference in our tests
const mockToastFns = {
  loading: jest.fn().mockReturnValue('loading-toast-id'),
  success: jest.fn(),
  error: jest.fn(),
};

type ToastArgs = [message: string, options?: {id?: string}];

// Mock react-hot-toast
jest.mock('react-hot-toast', () => {
  return {
    __esModule: true,
    default: {
      loading: (...args: ToastArgs) => mockToastFns.loading(...args),
      success: (...args: ToastArgs) => mockToastFns.success(...args),
      error: (...args: ToastArgs) => mockToastFns.error(...args),
    },
  };
});

describe('Email form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form with email and password inputs', () => {
    render(<InvitePatientForm />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('handles successful email invitation', async () => {
    // Mock SignIn to resolve successfully

    render(<InvitePatientForm />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: {value: 'test@example.com'},
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', {name: /Enviar invitación/i}));

    // Verify loading state
    expect(mockToastFns.loading).toHaveBeenCalledWith('Enviando invitación...');
  });
});
