import { Avatar, Card, Typography } from 'antd';
import {
  UserOutlined,
  CommentOutlined,
  AlignLeftOutlined
} from '@ant-design/icons';
import { PostListType, PostType } from '@/types';
import { BASE_URL } from '@/configs';
import axios from '@/libs/axios';

const { Text } = Typography;

async function getPostsData() {
  try {
    const { data } = await axios.get('/public/v2/posts', {
      params: {
        page: 1,
        per_page: 10
      }
    });

    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

export async function getServerSideProps() {
  const [data, error] = await getPostsData();

  const posts = {
    data,
    error
  };

  return { props: { posts } };
}

interface HomeProps {
  posts: {
    data: PostListType;
    error: string;
  };
}

export default function Home({ posts }: HomeProps) {
  const { data, error } = posts;

  if (error) {
    return (
      <div className='flex flex-col items-center'>
        <Text>Failed to get data</Text>
        <Text>Error: {error}</Text>
      </div>
    );
  }

  const onClickComment = () => {};
  const onClickDetail = () => {};

  return (
    <div className='p-5'>
      {data.map((post: PostType) => {
        return (
          <Card
            key={post.id}
            className='min-w-[300px] [&:not(:first-child)]:my-2'
            actions={[
              <div key='comment' onClick={onClickComment}>
                <CommentOutlined className='mr-2' />
                <Text>Comment</Text>
              </div>,
              <div key='detail' onClick={onClickDetail}>
                <AlignLeftOutlined className='mr-2' />
                <Text>See Detail</Text>
              </div>
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              }
              title={
                <p className='cursor-pointer' onClick={onClickDetail}>
                  {post.title}
                </p>
              }
              description={
                <div className='cursor-pointer' onClick={onClickDetail}>
                  <Text>{post.body}</Text>
                </div>
              }
            />
          </Card>
        );
      })}
    </div>
  );
}
