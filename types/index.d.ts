// export type EmergencyInfo = {
//   emergencyId: string;
//   userName: string;
//   userPhone: string;
//   userAge: number;
//   userAddress: string;
//   userWeight: double;
//   userHeight: double;
//   emergencyTime: Date;
//   strokeLevel?: string;
//   emergencyLocation: {latitude: double; longitude: double};
// };

export type EmergencyPatient = {
	firstName: string;
	lastName: string;
	age: number;
	address?: string;
	weight: number;
	height: number;
	phoneNumber: string;
  conditions?: string[];
  medications?: string[];
};

export type EmergencyInfo = {
	emergencyId: string;
	patient: EmergencyPatient;
	startDate: Date;
	nihScale?: number;
	// emergencyLocation: {latitude: double; longitude: double};
};

export type UserUpdateData = {
  firstName: string;
  lastName: string;
};