import { getCookie } from '@/utils/cookies';
import {EventSourcePolyfill} from 'event-source-polyfill';

export function createEventSource(url: string): EventSourcePolyfill {
	const token = getCookie('authToken');

  console.log('Creating SSE connection to:', url);
	console.log('Using auth token:', token ? 'Present' : 'Not present');

	const eventSource = new EventSourcePolyfill(url, {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	});

  	// Add connection state logging
	eventSource.addEventListener('open', () => {
		console.log('SSE Connection opened');
	});

	eventSource.onmessage = (event) => {
		console.log('New message:', event.data);
	};

  eventSource.addEventListener('error', (error) => {
		console.error('SSE Connection error:', error);
	});

	return eventSource;
}
