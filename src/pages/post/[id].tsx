'use client';

import { getPostCommentsData, getPostDetailData } from '@/services/posts';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  useQuery
} from '@tanstack/react-query';
import { Avatar, Card, Pagination, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GetServerSidePropsContext } from 'next';
import {
  queryClient,
  COMMENTS_QUERY,
  POST_QUERY,
  USER_QUERY
} from '@/libs/react-query';
import { useState } from 'react';
import { PostSkeleton } from '@/components';
import { getUserData } from '@/services/users';

const { Text } = Typography;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const params = ctx?.params;
  const postId = parseInt((params?.id || '') as string);
  await queryClient.prefetchQuery({
    queryKey: [POST_QUERY, postId],
    queryFn: () => getPostDetailData(postId)
  });
  await queryClient.prefetchQuery({
    queryKey: [COMMENTS_QUERY, postId],
    queryFn: () => getPostCommentsData(postId)
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      postId
    }
  };
};

const PostDetail = ({ postId }: { postId: number }) => {
  const [commentPage, setCommentPage] = useState(1);

  const { data: postData } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostDetailData(postId)
  });
  const { data: commentData, isLoading: isCommentLoading } = useQuery({
    queryKey: ['comments', postId, commentPage],
    queryFn: () => getPostCommentsData(postId)
  });
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: [USER_QUERY, postData?.data?.user_id],
    queryFn: () => getUserData(postData?.data?.user_id as number)
  });
  const totalPage = commentData?.meta?.pagination?.total;

  return (
    <div className='py-5'>
      <Card
        title={
          <div key='user' className='flex items-center'>
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              className='mr-2'
              icon={<UserOutlined />}
            />
            <div className='flex flex-col'>
              <Text>
                {userData?.data?.name} (user_{postData?.data?.user_id})
              </Text>
              <Text className='text-xs font-normal text-gray-500'>
                {userData?.data?.email}
              </Text>
            </div>
          </div>
        }
      >
        <Card.Meta
          title={postData?.data?.title}
          description={
            <div>
              <Text>{postData?.data?.body}</Text>
            </div>
          }
        />
      </Card>
      <Card title='Comments'>
        {isCommentLoading ? (
          <PostSkeleton />
        ) : (
          commentData?.data?.map((comment) => {
            return (
              <Card
                key={comment.id}
                className='[&:not(:first-child)]:my-2'
                type='inner'
                title={comment.name}
              >
                {comment.body}
              </Card>
            );
          })
        )}
        <Pagination
          className='mt-8 w-full'
          align='center'
          defaultCurrent={commentPage}
          total={totalPage}
          showSizeChanger={false}
          onChange={(current) => setCommentPage(current)}
        />
      </Card>
    </div>
  );
};

const PostDetailRoute = ({
  dehydratedState,
  postId
}: {
  dehydratedState: DehydratedState;
  postId: number;
}) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostDetail postId={postId} />
    </HydrationBoundary>
  );
};

export default PostDetailRoute;
