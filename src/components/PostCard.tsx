import { Post } from '@/types';
import { Avatar, Card, Typography } from 'antd';
import {
  UserOutlined,
  CommentOutlined,
  AlignLeftOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const PostCard = ({ data }: { data: Post }) => {
  const onClickComment = () => {};
  const onClickDetail = () => {};

  return (
    <Card
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
            {data.title}
          </p>
        }
        description={
          <div className='cursor-pointer' onClick={onClickDetail}>
            <Text>{data.body}</Text>
          </div>
        }
      />
    </Card>
  );
};

export default PostCard;
