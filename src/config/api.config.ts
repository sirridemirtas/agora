export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api/v1',  // Use env variable with fallback
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.baseUrl}${path}`;
};
