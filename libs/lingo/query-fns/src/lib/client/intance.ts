import axios from 'axios';

export const axionInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'] as string,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axionInstance.interceptors.request.use(async (config) => {
  if (!config.headers['noAuth']) {
    // skip refresh token if noAuth header is present. This is used for sign in and sign up where we don't have a token yet
    return config;
  }

  try {
    const response = await axios.post('/api/refresh-token', {
      baseURL: process.env['NEXT_PUBLIC_SITE_URL'],
    });
    console.log(response.data);

    return config;
  } catch (error) {
    console.error(error);
    // Optionally, you might want to reject the original request if the POST fails
    // return Promise.reject(error);
    return config; // Or continue with the original request configuration
  }
});

export const setAxiosToken = (token: string) => {
  axionInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAxiosToken = () => {
  delete axionInstance.defaults.headers.common['Authorization'];
};

export const setAxiosTokenFromCookie = (cookie: string) => {
  setAxiosToken(cookie);
};

export const clearAxiosTokenFromCookie = () => {
  clearAxiosToken();
};
