export type ApiError = {
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
};

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
};

export type ApiRequestConfig = {
  headers?: Record<string, string>;
  baseURL?: string;
};
