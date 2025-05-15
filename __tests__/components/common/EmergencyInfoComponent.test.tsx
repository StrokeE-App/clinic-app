import { render, screen } from '@testing-library/react';
import EmergencyInfoComponent from '@/components/EmergencyInfoComponent';
import { EmergencyInfo } from '@/types';
import { formatDate } from '@/utils/functions';

jest.mock('@/utils/functions', () => ({
  formatDate: jest.fn(() => 'hace 3 horas'),
}));

describe('EmergencyInfoComponent', () => {
  it('should show loading when emergency is null', () => {
    render(<EmergencyInfoComponent emergency={null} />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  const mockEmergency: EmergencyInfo = {
    startDate: new Date().toISOString(),
    patient: {
      firstName: 'Juan',
      lastName: 'Pérez',
      phoneNumber: '123456789',
      age: 30,
      weight: 70,
      height: 1.75,
      conditions: ['Hipertensión', 'Diabetes'],
      medications: ['Metformina', 'Enalapril'],
    },
  };

  it('should render patient basic info correctly', () => {
    render(<EmergencyInfoComponent emergency={mockEmergency} />);

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('30 años')).toBeInTheDocument();
    expect(screen.getByText('70 kg')).toBeInTheDocument();
    expect(screen.getByText('1.75 m')).toBeInTheDocument();
    expect(screen.getByText('hace 3 horas')).toBeInTheDocument(); // mocked formatDate
  });

  it('should render patient conditions if available', () => {
    render(<EmergencyInfoComponent emergency={mockEmergency} />);

    expect(screen.getByText('Condiciones')).toBeInTheDocument();
    expect(screen.getByText('Hipertensión')).toBeInTheDocument();
    expect(screen.getByText('Diabetes')).toBeInTheDocument();
  });

  it('should render patient medications if available', () => {
    render(<EmergencyInfoComponent emergency={mockEmergency} />);

    expect(screen.getByText('Medicamentos')).toBeInTheDocument();
    expect(screen.getByText('Metformina')).toBeInTheDocument();
    expect(screen.getByText('Enalapril')).toBeInTheDocument();
  });

  it('should not render conditions or medications sections if empty', () => {
    const noExtras = {
      ...mockEmergency,
      patient: {
        ...mockEmergency.patient,
        conditions: undefined,
        medications: undefined,
      },
    };
    render(<EmergencyInfoComponent emergency={noExtras} />);
    expect(screen.queryByText('Condiciones')).not.toBeInTheDocument();
    expect(screen.queryByText('Medicamentos')).not.toBeInTheDocument();
  });
});
