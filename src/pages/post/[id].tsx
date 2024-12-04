'use client';

import { getPostCommentsData, getPostDetailData } from '@/services/posts';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  useQuery
} from '@tanstack/react-query';
import { Avatar, Button, Card, Pagination, Typography } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { GetServerSidePropsContext } from 'next';
import {
  queryClient,
  COMMENTS_QUERY,
  POST_QUERY,
  USER_QUERY
} from '@/libs/react-query';
import { useState } from 'react';
import { PostSkeleton } from '@/components';
import { getUserData, getUserDetailData } from '@/services/users';
import { usePostForm } from '@/context/PostFormContext';

const { Text } = Typography;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const params = ctx?.params;
  const postId = parseInt((params?.id || '') as string, 10);
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
  const { handleOpenEditModal } = usePostForm();
  const [commentPage, setCommentPage] = useState(1);
  const userData = getUserData();

  const { data: postData } = useQuery({
    queryKey: [POST_QUERY, postId],
    queryFn: () => getPostDetailData(postId)
  });
  const { data: commentData, isLoading: isCommentLoading } = useQuery({
    queryKey: [COMMENTS_QUERY, postId, commentPage],
    queryFn: () => getPostCommentsData(postId)
  });
  const { data: postOwnerData, isLoading: isUserLoading } = useQuery({
    queryKey: [USER_QUERY, postData?.data?.user_id],
    queryFn: () => getUserDetailData(postData?.data?.user_id as number)
  });
  const totalPage = commentData?.meta?.pagination?.total;
  const isCurrentUserPost = userData?.user?.id === postData?.data?.user_id;

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
              {isUserLoading ? (
                <Text>Loading...</Text>
              ) : (
                <>
                  <Text>
                    {postOwnerData?.data?.name} (user_{postData?.data?.user_id})
                  </Text>
                  <Text className='text-xs font-normal text-gray-500'>
                    {postOwnerData?.data?.email}
                  </Text>
                </>
              )}
            </div>
          </div>
        }
        extra={[
          ...(!isUserLoading && isCurrentUserPost
            ? [
                <Button
                  key='edit'
                  type='text'
                  icon={<EditOutlined />}
                  onClick={() => handleOpenEditModal(postData?.data)}
                >
                  Edit
                </Button>
              ]
            : [])
        ]}
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
