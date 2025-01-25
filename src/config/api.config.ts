export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || (window.location.origin + '/api/v1'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.baseURL}${path}`;
};
