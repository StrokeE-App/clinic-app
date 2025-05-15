import {
  requestNotificationPermission,
  initializeFirebaseMessaging,
  subscribeToNotifications,
  unsubscribeFromNotifications,
} from '@/utils/notifications';
import apiClient from '@/api/apiClient';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

jest.mock('@/api/apiClient', () => ({
  post: jest.fn(),
}));

jest.mock('firebase/messaging', () => ({
  getMessaging: jest.fn(),
  getToken: jest.fn(),
  onMessage: jest.fn(),
}));

describe('notification utilities', () => {
  describe('requestNotificationPermission', () => {
    beforeEach(() => {
      // @ts-ignore
      global.Notification = {
        permission: 'default',
        requestPermission: jest.fn(),
      };
    });

    it('returns true if permission is already granted', async () => {
      // @ts-ignore
      global.Notification.permission = 'granted';
      const result = await requestNotificationPermission();
      expect(result).toBe(true);
    });

    it('throws if permission is denied', async () => {
      // @ts-ignore
      global.Notification.permission = 'denied';
      await expect(requestNotificationPermission()).rejects.toThrow(
        'Notifications have been blocked. Please enable them in your browser settings.'
      );
    });

    it('resolves true when permission is granted after prompt', async () => {
      // @ts-ignore
      global.Notification.permission = 'default';
      // @ts-ignore
      global.Notification.requestPermission = jest.fn().mockResolvedValue('granted');

      const result = await requestNotificationPermission();
      expect(result).toBe(true);
    });

    it('throws if permission is not granted', async () => {
      // @ts-ignore
      global.Notification.permission = 'default';
      // @ts-ignore
      global.Notification.requestPermission = jest.fn().mockResolvedValue('default');

      await expect(requestNotificationPermission()).rejects.toThrow(
        'Notification permission was not granted'
      );
    });
  });

  describe('initializeFirebaseMessaging', () => {
    const mockRegister = jest.fn();
    const mockGetToken = getToken as jest.Mock;
    const mockOnMessage = onMessage as jest.Mock;

    beforeEach(() => {
      mockGetToken.mockReset();
      mockOnMessage.mockReset();
      // @ts-ignore
      global.navigator.serviceWorker = {
        register: jest.fn().mockResolvedValue({
          active: true,
        }),
      };
    });

    it('calls getToken and sets up onMessage', async () => {
      mockGetToken.mockResolvedValue('mock-token');

      const token = await initializeFirebaseMessaging();

      expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/service-worker.js', { scope: '/' });
      expect(getMessaging).toHaveBeenCalled();
      expect(mockGetToken).toHaveBeenCalled();
      expect(mockOnMessage).toHaveBeenCalled();
      expect(token).toBe('mock-token');
    });

    it('throws if there is an error', async () => {
      mockGetToken.mockRejectedValue(new Error('fail'));

      await expect(initializeFirebaseMessaging()).rejects.toThrow('fail');
    });
  });

  describe('subscribeToNotifications', () => {
    it('calls API with correct payload', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({ data: 'ok' });

      const result = await subscribeToNotifications('admin', 'user123', 'token456', 'device789');
      expect(apiClient.post).toHaveBeenCalledWith('/push-notifications/subscribe-notification', {
        role: 'healthCenter',
        userId: 'user123',
        token: 'token456',
        device: 'device789',
      });
      expect(result).toBe('ok');
    });

    it('throws on error', async () => {
      (apiClient.post as jest.Mock).mockRejectedValue(new Error('error'));
      await expect(subscribeToNotifications('admin', 'u', 't', 'd')).rejects.toThrow('error');
    });
  });

  describe('unsubscribeFromNotifications', () => {
    it('calls API with correct payload', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({ data: 'done' });

      const result = await unsubscribeFromNotifications('admin', 'user999', 'tokenABC');
      expect(apiClient.post).toHaveBeenCalledWith('/push-notifications/unsubscribe-notification', {
        role: 'healthCenter',
        userId: 'user999',
        token: 'tokenABC',
      });
      expect(result).toBe('done');
    });

    it('throws on error', async () => {
      (apiClient.post as jest.Mock).mockRejectedValue(new Error('fail'));
      await expect(unsubscribeFromNotifications('admin', 'u', 't')).rejects.toThrow('fail');
    });
  });
});
