export type PostListType = PostType[];
export interface PostType {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
