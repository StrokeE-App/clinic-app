import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '@/hooks/useNotifications';
import * as notifications from '@/utils/notifications';

jest.mock('@/utils/notifications');

const mockRequestPermission = notifications.requestNotificationPermission as jest.Mock;
const mockInitMessaging = notifications.initializeFirebaseMessaging as jest.Mock;
const mockSubscribe = notifications.subscribeToNotifications as jest.Mock;
const mockUnsubscribe = notifications.unsubscribeFromNotifications as jest.Mock;

describe('useNotifications', () => {
	const role = 'healthCenter';
	const userId = 'user123';

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should subscribe successfully', async () => {
		mockRequestPermission.mockResolvedValue(true);
		mockInitMessaging.mockResolvedValue('mock-token');
		mockSubscribe.mockResolvedValue(undefined);

		const { result } = renderHook(() => useNotifications(role, userId));

		await act(async () => {
			await result.current.subscribe();
		});

		expect(mockRequestPermission).toHaveBeenCalled();
		expect(mockInitMessaging).toHaveBeenCalled();
		expect(mockSubscribe).toHaveBeenCalledWith(role, userId, 'mock-token', 'web');
		expect(result.current.isSubscribed).toBe(true);
		expect(result.current.error).toBeNull();
	});

	it('should handle denied permission', async () => {
		mockRequestPermission.mockResolvedValue(false);

		const { result } = renderHook(() => useNotifications(role, userId));

		await act(async () => {
			await result.current.subscribe();
		});

		expect(result.current.isSubscribed).toBe(false);
		expect(result.current.error).toBe('Notification permission denied');
	});

	it('should handle missing token', async () => {
		mockRequestPermission.mockResolvedValue(true);
		mockInitMessaging.mockResolvedValue(null);

		const { result } = renderHook(() => useNotifications(role, userId));

		await act(async () => {
			await result.current.subscribe();
		});

		expect(result.current.error).toBe('Failed to get notification token');
		expect(result.current.isSubscribed).toBe(false);
	});

	it('should catch subscribe errors', async () => {
		mockRequestPermission.mockResolvedValue(true);
		mockInitMessaging.mockResolvedValue('token');
		mockSubscribe.mockRejectedValue(new Error('subscribe error'));

		const { result } = renderHook(() => useNotifications(role, userId));

		await act(async () => {
			await result.current.subscribe();
		});

		expect(result.current.error).toBe('subscribe error');
	});
  
	it('should catch unsubscribe errors', async () => {
		mockInitMessaging.mockResolvedValue('mock-token');
		mockUnsubscribe.mockRejectedValue(new Error('unsubscribe fail'));

		const { result } = renderHook(() => useNotifications(role, userId));

		await act(async () => {
			await result.current.unsubscribe();
		});

		expect(result.current.error).toBe('unsubscribe fail');
	});
});
