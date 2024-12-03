import { UserData } from '@/context/LoginDialogContext';
import axios from '@/libs/axios';
import {
  CreatePostRequest,
  PostCommentsResponse,
  PostResponse,
  PostsResponse
} from '@/types';
import { AxiosResponse } from 'axios';

export async function getPostsData(page: number = 1, per_page: number = 10) {
  const { data }: AxiosResponse<PostsResponse> = await axios.get(
    '/public/v1/posts',
    {
      params: {
        page: page,
        per_page: per_page
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

export async function createPost(data: CreatePostRequest) {
  const userData = localStorage.getItem('user_data');
  const parseUser: UserData = JSON.parse(userData || '{}');

  const res = await axios.post('/public/v1/posts/', data, {
    headers: {
      Authorization: parseUser?.accessToken
    }
  });

  return res;
}
