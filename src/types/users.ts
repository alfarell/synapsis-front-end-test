import { Meta } from './meta';

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface UserData {
  user: UserDetail;
  accessToken: string;
}

export interface UserResponse {
  meta: Meta | null;
  data: UserDetail;
}

export interface UsersResponse {
  meta: Meta | null;
  data: UserDetail[];
}
