import axios from '@/libs/axios';
import { UserData, UserResponse, UsersResponse } from '@/types';
import { AxiosResponse } from 'axios';

export function setUserData(userData: UserData) {
  localStorage.setItem('user_data', JSON.stringify(userData));
}

export function getUserData() {
  const userData =
    typeof window !== 'undefined' ? localStorage.getItem('user_data') : '{}';
  return JSON.parse(userData || '{}') as UserData;
}

export async function userLogin({
  name,
  accessToken
}: {
  name: string;
  accessToken: string;
}) {
  const { data: getUserDataResponse }: AxiosResponse<UsersResponse> =
    await axios.get('/public/v1/users/');
  const user = getUserDataResponse?.data?.[0];
  const updateData = {
    name
  };
  const { data: updateUserDataResponse }: AxiosResponse<UserResponse> =
    await axios.put(`/public/v1/users/${user.id}`, updateData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

  const userData = {
    user: updateUserDataResponse.data,
    accessToken
  };
  setUserData(userData);

  return userData;
}

export async function getUserDetailData(id: number) {
  if (!id) throw new Error('UserId is required');

  const { data }: AxiosResponse<UserResponse> = await axios.get(
    `/public/v1/users/${id}`
  );

  return data;
}
