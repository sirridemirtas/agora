import { API_CONFIG, getApiUrl } from '@/config/api.config';
import { ApiError, ApiRequestConfig, ApiResponse } from './types';
import axiosInstance from '@/lib/fetcher';
import { AxiosRequestConfig, AxiosError } from 'axios';

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
    options?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const url = getApiUrl(path);
    
    try {
      const response = await axiosInstance({
        url,
        ...options,
      });
      
      return {
        data: response.data,
        error: null,
        loading: false,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      
      return {
        data: null,
        error: {
          message: axiosError.response?.data?.message || 
                   axiosError.message || 
                   'Bir hata oluştu',
          code: axiosError.response?.data?.code || 'UNKNOWN_ERROR'
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
