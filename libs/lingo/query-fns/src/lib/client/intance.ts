import axios from 'axios';

export const axionInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'] as string,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
