'use client';

import { Button, Empty, Form, Input, Pagination, Typography } from 'antd';
import { Post, PostsResponse } from '@/types';
import { getPostsData } from '@/services/posts';
import { useQuery } from '@tanstack/react-query';
import { POSTS_QUERY } from '@/libs/react-query';
import { PostSkeleton, PostCard } from '@/components';
import { useState } from 'react';
import Head from 'next/head';
import { SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const {
    data: queryData,
    error,
    isLoading
  } = useQuery({
    queryKey: [POSTS_QUERY, page, perPage, search],
    queryFn: () => getPostsData(page, perPage, search)
  });
  const { data, meta } = (queryData || {}) as PostsResponse;
  const totalPage = meta?.pagination?.total;

  if (error) {
    return (
      <div className='flex flex-col items-center'>
        <Text>Failed to get data</Text>
        <Text>Error: {error?.message || ''}</Text>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>BlogApp</title>
        <meta property='description' content='Blog post platform' />
      </Head>
      <div className='py-5 px-2'>
        <Form
          className='flex justify-center'
          onFinish={(val) => setSearch(val?.search || '')}
          onChange={(val) => {
            if (!(val?.target as HTMLInputElement)?.value) setSearch('');
          }}
        >
          <Form.Item name='search' className='w-full max-w-xl mr-2'>
            <Input placeholder='Input post title...' />
          </Form.Item>
          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        {isLoading ? (
          <PostSkeleton />
        ) : (
          <>
            {data?.length ? (
              data?.map((post: Post) => {
                return <PostCard key={post.id} data={post} />;
              })
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
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
          </>
        )}
      </div>
    </>
  );
}
