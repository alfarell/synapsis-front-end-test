import { Meta } from './meta';

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
export type Posts = Post[];

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
export type Comments = Comment[];

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

export interface CreatePostRequest {
  title: string;
  body: string;
}
