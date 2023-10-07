import axios from 'axios';

/**
 * This is the axios instance that is used for all requests to the backend.
 * It is configured to use the correct base url and to send the correct headers.
 * It also has an interceptor that will refresh the token if it is expired.
 * @see
 */
export const axionInstance = axios.create({
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
axionInstance.interceptors.request.use(async (request) => {
  if (request.headers['noAuth'] && request.headers['noAuth'] !== true) {
    console.log('no auth header found');
    return request;
  }

  try {
    const response = await axios.get('/api/refresh-token', {
      baseURL: process.env['NEXT_PUBLIC_SITE_URL'],
      withCredentials: true,
    });
    const authHeader = (request.headers.Authorization =
      response.headers['authorization']);

    console.log({ authHeader });

    return request;
  } catch (error) {
    return Promise.reject(error);
  }
});

/**
 * Add a response interceptor
 * will run whenever a response is received from the backend.
 * no use for this yet.
 */
axionInstance.interceptors.response.use(async (response) => {
  if (response.headers['authorization']) {
    response.headers['authorization'] =
      response.request.headers['authorization'];
  }

  return response;
});

/**
 * sets the token in the axios instance
 * @param token string
 */
export const setAxiosToken = (token: string) => {
  axionInstance.defaults.headers.common['Authorization'] = `${token}`;
};

/**
 * clears the token in the axios instance
 */
export const clearAxiosToken = () => {
  delete axionInstance.defaults.headers.common['Authorization'];
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
