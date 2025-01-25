import { API_CONFIG, getApiUrl } from '@/config/api.config';
import { ApiError, ApiRequestConfig, ApiResponse } from './types';

export class BaseService {
  protected config: ApiRequestConfig;

  constructor(config?: ApiRequestConfig) {
    this.config = {
      ...API_CONFIG,
      ...config,
    };
  }

  protected async fetchApi<T>(
    path: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = getApiUrl(path);
    const defaultOptions: RequestInit = {
      headers: {
        ...this.config.headers,
      },
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        return {
          data: null,
          error,
          loading: false,
        };
      }

      const data: T = await response.json();
      return {
        data,
        error: null,
        loading: false,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          message: error instanceof Error ? error.message : 'Bir hata oluştu',
        },
        loading: false,
      };
    }
  }

  protected handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'UNKNOWN_ERROR',
      };
    }
    return {
      message: 'Bilinmeyen bir hata oluştu',
      code: 'UNKNOWN_ERROR',
    };
  }
}
