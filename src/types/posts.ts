import { Meta } from './meta';

export type Posts = Post[];
export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export type Comments = Comment[];
export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export type PostsResponse = {
  data: Posts;
  meta: Meta;
};
export type PostResponse = {
  data: Post;
  meta: Meta;
};
export type PostCommentsResponse = {
  data: Comments;
  meta: Meta;
};
