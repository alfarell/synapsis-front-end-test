import axios from '@/libs/axios';
import { PostsResponse } from '@/types';
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
