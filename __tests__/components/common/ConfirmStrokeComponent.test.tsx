import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConfirmStrokeComponent from '@/components/ConfirmStrokeComponent';
import apiClient from '@/api/apiClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('react-hot-toast', () => ({
  loading: jest.fn(() => 'toast-id'),
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/api/apiClient', () => ({
  post: jest.fn(),
}));

// Mock Modal
jest.mock('@/components/HourModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onConfirm, title }: any) =>
    isOpen ? (
      <div data-testid="modal">
        <p>{title}</p>
        <button onClick={() => onConfirm(new Date('2024-01-01T10:00:00Z'))}>Confirmar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    ) : null,
}));

describe('ConfirmStrokeComponent', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it('renders the Atendido button', () => {
    render(<ConfirmStrokeComponent emergencyId="emergency-123" />);
    expect(screen.getByText('Atendido')).toBeInTheDocument();
  });

  it('opens modal on button click and shows title', () => {
    render(<ConfirmStrokeComponent emergencyId="emergency-123" />);
    fireEvent.click(screen.getByText('Atendido'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('¿El paciente ya fue atendido?')).toBeInTheDocument();
  });

  it('calls API and redirects on confirm', async () => {
    (apiClient.post as jest.Mock).mockResolvedValue({ status: 200 });

    render(<ConfirmStrokeComponent emergencyId="emergency-123" />);
    fireEvent.click(screen.getByText('Atendido'));

    await waitFor(() => screen.getByText('Confirmar'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/healthCenter/attended-patient', {
        emergencyId: 'emergency-123',
        attendedDate: new Date('2024-01-01T10:00:00Z'),
      });
      expect(toast.success).toHaveBeenCalledWith('Datos registrados correctamente', { id: 'toast-id' });
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error toast if API fails', async () => {
    (apiClient.post as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<ConfirmStrokeComponent emergencyId="emergency-123" />);
    fireEvent.click(screen.getByText('Atendido'));

    await waitFor(() => screen.getByText('Confirmar'));
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Se produjo un error al registrar los datos, por favor intente más tarde',
        { id: 'toast-id' }
      );
    });
  });
});
