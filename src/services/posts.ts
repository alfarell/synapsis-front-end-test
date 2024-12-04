import axios from '@/libs/axios';
import {
  CreatePostRequest,
  PostCommentsResponse,
  PostResponse,
  PostsResponse
} from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { getUserData } from './users';

export async function getPostsData(page: number = 1, per_page: number = 10) {
  const userData = getUserData();

  const { data }: AxiosResponse<PostsResponse> = await axios.get(
    '/public/v1/posts',
    {
      params: {
        page: page,
        per_page: per_page
      },
      headers: {
        ...(userData?.accessToken && {
          Authorization: `Bearer ${userData?.accessToken}`
        })
      }
    }
  );

  return data;
}

export async function getPostDetailData(id: number) {
  const userData = getUserData();

  const { data }: AxiosResponse<PostResponse> = await axios.get(
    `/public/v1/posts/${id}`,
    {
      headers: {
        ...(userData?.accessToken && {
          Authorization: `Bearer ${userData?.accessToken}`
        })
      }
    }
  );

  return data;
}

export async function getPostCommentsData(id: number, page: number = 1) {
  const userData = getUserData();

  const { data }: AxiosResponse<PostCommentsResponse> = await axios.get(
    `/public/v1/posts/${id}/comments`,
    {
      params: {
        page,
        per_page: 10
      },
      headers: {
        ...(userData?.accessToken && {
          Authorization: `Bearer ${userData?.accessToken}`
        })
      }
    }
  );

  return data;
}

export async function createPost(newPostData: CreatePostRequest) {
  const userData = getUserData();

  try {
    const { data } = await axios.post(
      `/public/v1/users/${userData.user.id}/posts`,
      newPostData,
      {
        headers: {
          Authorization: `Bearer ${userData?.accessToken}`
        }
      }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data.data.message;
      throw new Error(errorMessage);
    }

    throw error;
  }
}

export async function editPost({
  postId,
  postData
}: {
  postId: number | undefined;
  postData: CreatePostRequest;
}) {
  const userData = getUserData();

  if (!postId) throw new Error('Post Id is required');

  try {
    const { data } = await axios.put(`/public/v1/posts/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${userData?.accessToken}`
      }
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data.data.message;
      throw new Error(errorMessage);
    }

    throw error;
  }
}
