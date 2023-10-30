import axios, {
  InternalAxiosRequestConfig,
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { Api } from '../query-fns';

/**
 * This is the axios instance that is used for all requests to the backend.
 * It is configured to use the correct base url and to send the correct headers.
 * It also has an interceptor that will refresh the token if it is expired.
 * @see
 */
export const axiosInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'] as string,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: true,
});

/**
 * This is the type for the original request config.
 * It is used to mark the request as retried or not to prevent infinite loops.
 *
 */
interface OriginalRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
  _retry?: boolean;
}

/**
 * This is the queue for requests that failed due to an expired token.
 * It is used to prevent multiple requests from refreshing the token at the same time.
 */
interface RequestQueueItem {
  resolve: (
    value?: AxiosRequestConfig | PromiseLike<AxiosRequestConfig> | undefined
  ) => void;
  reject: (reason?: any) => void;
}

/**
 * indicates if the token is currently being refreshed or not.
 */
let isRefreshing = false;

/**
 * failed queue for requests that failed due to an expired token.
 */
let failedQueue: RequestQueueItem[] = [];

/**
 * Process the queue for requests that failed due to an expired token.
 * @param error the error that caused the token to expire.
 * @param requestConfig the request config that was used to make the request.
 */
function processQueue(
  error: any,
  requestConfig: AxiosRequestConfig | null = null
) {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(requestConfig!)
  );
  failedQueue = [];
}

/**
 * Add a request interceptor
 * will run whenever a request is sent to the backend.
 * this is used to refresh the token if it is expired.
 * will also skip the refresh token if the noAuth header is present.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config! as OriginalRequestConfig;
    console.log(originalRequest.url);
    // Prevent infinite loops or retrying requests that have no recoverable errors
    if (
      !error.response ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true; // Marking request as retried

    if (isRefreshing) {
      // If refreshing, add this request to the queue to be executed once refresh is done
      try {
        const requestConfig = await new Promise((resolve, reject) => {
          // Add this request to the queue to be executed once refresh is done
          failedQueue.push({ resolve, reject });
        });

        // Retry the original request
        return await axiosInstance(requestConfig as AxiosRequestConfig);
      } catch (error) {
        // If refresh fails, reject the promise
        // send the user to the login page. redirect happens at page/component level
        return Promise.reject(error);
      }
    }

    isRefreshing = true;

    try {
      // Refresh the token
      await Api.auth.refreshToken();

      // If successful, resolve all requests in the failedQueue using the new token
      processQueue(null, originalRequest);

      // Retry the original request with the new token
      return await axiosInstance(originalRequest);
    } catch (refreshError) {
      // If refresh fails, reject all requests in the failedQueue
      processQueue(refreshError, null);

      // send the user to the login page. redirect happens at page/component level
      return Promise.reject(refreshError);
    } finally {
      // Reset the refresh flag so subsequent requests can trigger refresh if needed
      isRefreshing = false;
    }
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
