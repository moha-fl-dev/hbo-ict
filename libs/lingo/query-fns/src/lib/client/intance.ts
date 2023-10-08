import axios from 'axios';

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
 * Add a request interceptor
 * will run whenever a request is sent to the backend.
 * this is used to refresh the token if it is expired.
 * will also skip the refresh token if the noAuth header is present.
 */
axiosInstance.interceptors.response.use(
  (response) => {
    console.log({ response });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log({
      originalRequest,
    });

    // Check if we should refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marking request as retried

      try {
        // Refresh the token
        await axios.get('auth/refresh-token', {
          baseURL: process.env['NEXT_PUBLIC_API_URL'] as string,
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        // Retry the original request with the new token
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle error on token refresh, for instance, redirect to login page
        console.error(refreshError);
        // Optionally, handle the error, e.g., navigate to the login screen, show error to the user, etc.
        return Promise.reject(refreshError);
      }
    }

    // If error is due to other reasons, reject the promise
    return Promise.reject(error);
  }
);

/**
 * Add a response interceptor
 * will run whenever a response is received from the backend.
 * no use for this yet.
 */

/**
 * sets the token in the axios instance
 * @param token string
 */
export const setAxiosToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
};

/**
 * clears the token in the axios instance
 */
export const clearAxiosToken = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};

/**
 * sets the token in the axios instance from a cookie
 * @param cookie string
 */
export const setAxiosTokenFromCookie = (cookie: string) => {
  setAxiosToken(cookie);
};

/**
 * clears the token in the axios instance
 */
export const clearAxiosTokenFromCookie = () => {
  clearAxiosToken();
};
