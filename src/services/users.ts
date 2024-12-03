import axios from '@/libs/axios';
import { UserResponse } from '@/types';
import { AxiosResponse } from 'axios';

export async function getUserData(id: number) {
  const { data }: AxiosResponse<UserResponse> = await axios.get(
    `/public/v1/users/${id}`
  );

  return data;
}
