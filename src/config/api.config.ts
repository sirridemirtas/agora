export const API_CONFIG = {
  baseUrl: '/api/v1',  // Use relative path instead of 'http://localhost:8080/api/v1'
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.baseUrl}${path}`;
};
