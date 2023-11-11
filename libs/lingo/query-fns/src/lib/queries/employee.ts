import type { AccountDto, ExtendedEmployee } from '@hbo-ict/lingo/types';
import { Employee } from '@hbo-ict/lingo/types';
import { axiosInstance } from '../client/intance';

async function upsert(payload: AccountDto) {
  const res = await axiosInstance.post<AccountDto>('employee', payload);

  return res.data;
}

async function userProfileExtended(): Promise<ExtendedEmployee> {
  const res = await axiosInstance.get<ExtendedEmployee>(
    'employee/UserProfileExtended',
  );

  return res.data;
}

export const employee = {
  upsert,
  userProfileExtended,
};
