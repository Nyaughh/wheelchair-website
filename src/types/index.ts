export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

export interface EmailConfig {
  emergencyEmail: string;
}

export type Theme = 'light' | 'dark';

export type LocationPermission = 'granted' | 'denied' | 'prompt' | 'unknown';
