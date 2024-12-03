'use client';

import { Pagination, Typography } from 'antd';
import { Post, PostsResponse } from '@/types';
import { getPostsData } from '@/services/posts';
import { useQuery } from '@tanstack/react-query';
import { POSTS_QUERY } from '@/libs/react-query';
import { PostSkeleton, PostCard } from '@/components';
import { useState } from 'react';

const { Text } = Typography;

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: queryData,
    error,
    isLoading
  } = useQuery({
    queryKey: [POSTS_QUERY, page, perPage],
    queryFn: () => getPostsData(page, perPage)
  });
  const { data, meta } = (queryData || {}) as PostsResponse;
  const totalPage = meta?.pagination?.total;

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (error) {
    return (
      <div className='flex flex-col items-center'>
        <Text>Failed to get data</Text>
        <Text>Error: {error?.message || ''}</Text>
      </div>
    );
  }

  return (
    <div className='py-5'>
      {data?.map((post: Post) => {
        return <PostCard key={post.id} data={post} />;
      })}
      <Pagination
        className='mt-8 w-full'
        align='center'
        defaultCurrent={page}
        total={totalPage}
        pageSize={perPage}
        onChange={(current) => setPage(current)}
        onShowSizeChange={(current, pageSize) => {
          setPage(current);
          setPerPage(pageSize);
        }}
      />
    </div>
  );
}
