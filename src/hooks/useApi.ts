import { useState, useCallback } from 'react';
import { ApiResponse, ApiError } from '@/services/types';

type ApiState<T> = {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
};

type ApiFunction<T, P extends unknown[]> = (...args: P) => Promise<ApiResponse<T>>;

export function useApi<T, P extends unknown[]>(
  apiFunction: ApiFunction<T, P>
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (...args: P) => {
      setState(prev => ({ ...prev, loading: true }));

      try {
        const response = await apiFunction(...args);
        setState({
          data: response.data,
          error: response.error,
          loading: false,
        });
        return response;
      } catch (error) {
        setState({
          data: null,
          error: {
            message: error instanceof Error ? error.message : 'Bir hata oluştu',
          },
          loading: false,
        });
        return {
          data: null,
          error: {
            message: error instanceof Error ? error.message : 'Bir hata oluştu',
          },
          loading: false,
        };
      }
    },
    [apiFunction]
  );

  return {
    ...state,
    execute,
  };
}
