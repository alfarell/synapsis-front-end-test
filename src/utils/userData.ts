import { UserData } from '@/types';

export function setUserData(userData: UserData) {
  localStorage.setItem('user_data', JSON.stringify(userData));
}

export function getUserData() {
  const userData =
    typeof window !== 'undefined' ? localStorage.getItem('user_data') : '{}';
  return JSON.parse(userData || '{}') as UserData;
}
