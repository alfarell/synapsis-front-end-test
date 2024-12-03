import axios from '@/libs/axios';
import { UserData, UserResponse, UsersResponse } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';

export function setUserData(userData: UserData) {
  localStorage.setItem('user_data', JSON.stringify(userData));
}

export function getUserData() {
  const userData = localStorage.getItem('user_data');
  return JSON.parse(userData || '{}') as UserData;
}

export async function userLogin({
  name,
  accessToken
}: {
  name: string;
  accessToken: string;
}) {
  try {
    const { data: getUserDataResponse }: AxiosResponse<UsersResponse> =
      await axios.get('/public/v1/users/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
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
    setUserData({
      user: updateUserDataResponse.data,
      accessToken
    });

    return userData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data.data.message;
      throw new Error(errorMessage);
    }

    throw error;
  }
}

export async function getUserDetailData(id: number) {
  const { data }: AxiosResponse<UserResponse> = await axios.get(
    `/public/v1/users/${id}`
  );

  return data;
}
