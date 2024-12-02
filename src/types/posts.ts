import { Meta } from './meta';

export type Posts = Post[];
export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
export type PostsResponse = {
  data: Posts;
  meta: Meta;
};
