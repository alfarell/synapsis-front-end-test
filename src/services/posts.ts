import axios from '@/libs/axios';
import {
  CreatePostRequest,
  PostCommentsResponse,
  PostResponse,
  PostsResponse
} from '@/types';
import { getUserData } from '@/utils/userData';
import { AxiosResponse } from 'axios';

export async function getPostsData(page: number = 1, per_page: number = 10) {
  const { data }: AxiosResponse<PostsResponse> = await axios.get(
    '/public/v1/posts',
    {
      params: {
        page,
        per_page
      }
    }
  );

  return data;
}

export async function getPostDetailData(id: number) {
  const { data }: AxiosResponse<PostResponse> = await axios.get(
    `/public/v1/posts/${id}`
  );

  return data;
}

export async function getPostCommentsData(id: number, page: number = 1) {
  const { data }: AxiosResponse<PostCommentsResponse> = await axios.get(
    `/public/v1/posts/${id}/comments`,
    {
      params: {
        page,
        per_page: 10
      }
    }
  );

  return data;
}

export async function createPost(newPostData: CreatePostRequest) {
  const userData = getUserData();

  const { data } = await axios.post(
    `/public/v1/users/${userData.user.id}/posts`,
    newPostData
  );

  return data;
}

export async function editPost({
  postId,
  postData
}: {
  postId: number | undefined;
  postData: CreatePostRequest;
}) {
  if (!postId) throw new Error('Post Id is required');

  const { data } = await axios.put(`/public/v1/posts/${postId}`, postData);

  return data;
}

export async function deletePost(postId: number | undefined) {
  if (!postId) throw new Error('Post Id is required');

  const { data } = await axios.delete(`/public/v1/posts/${postId}`);

  return data;
}
