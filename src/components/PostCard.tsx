import { Post } from '@/types';
import { Avatar, Card, Typography } from 'antd';
import {
  UserOutlined,
  AlignLeftOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/services/users';
import { usePostForm } from '@/context/PostFormContext';

const { Text } = Typography;

const PostCard = ({ data }: { data: Post }) => {
  const router = useRouter();
  const { handleOpenEditModal } = usePostForm();
  const userData = getUserData();
  const isCurrentUserPost = userData?.user?.id === data.user_id;

  const onClickDetail = () => {
    router.push(`/post/${data.id}`);
  };

  return (
    <Card
      className='min-w-[300px] [&:not(:first-child)]:my-2'
      actions={[
        <div key='detail' onClick={onClickDetail}>
          <AlignLeftOutlined className='mr-2' />
          <Text>See Detail</Text>
        </div>,
        ...(isCurrentUserPost
          ? [
              <div key='edit' onClick={() => handleOpenEditModal(data)}>
                <EditOutlined className='mr-2' />
                <Text>Edit</Text>
              </div>
            ]
          : [])
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
