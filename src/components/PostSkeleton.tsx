import { Card, Skeleton } from 'antd';

const PostSkeleton = () => {
  return (
    <div className='p-5'>
      {[...Array(3)].map((_, index) => {
        return (
          <Card
            key={index}
            className='min-w-[300px] [&:not(:first-child)]:my-2'
          >
            <Skeleton loading active avatar paragraph={{ rows: 2 }}></Skeleton>
          </Card>
        );
      })}
    </div>
  );
};

export default PostSkeleton;
