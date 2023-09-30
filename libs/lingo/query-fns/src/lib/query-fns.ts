import type {
  SuccesfulAuthResponse,
  AuthResponse,
  SignInDto,
} from '@hbo-ict/lingo/types';
import { axionInstance } from './client/intance';

export async function signInFn(payload: SignInDto): Promise<AuthResponse> {
  const result = await axionInstance.post<SuccesfulAuthResponse>(
    'auth/sign-in',
    payload
  );

  return result.data;
}
