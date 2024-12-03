import { Meta } from './meta';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface UserResponse {
  meta: Meta | null;
  data: User;
}
