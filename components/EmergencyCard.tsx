import { EmergencyInfo } from '@/types';
import { formatDate } from '@/utils/functions';
import {useRouter} from 'next/navigation';

interface EmergencyCardProps {
	userName: string;
	emergencyTime: string;
	emergencyId: string;
  emergency: EmergencyInfo;
}

export default function EmergencyCard({userName, emergencyTime, emergencyId, emergency}: EmergencyCardProps) {
	const router = useRouter();

	const handleClick = () => {
    const serialized = encodeURIComponent(JSON.stringify(emergency));
		router.push(`/emergency/${emergencyId}?data=${serialized}`);
	};

  

	return (
		<>
			<div onClick={handleClick} className="border-b border-red-200 py-4 w-full max-w-80 cursor-pointer">
				<p className="text-center text-customRed font-medium">{userName}</p>
				<p className="text-center text-customRed">{emergencyTime}</p>
			</div>
		</>
	);
}
