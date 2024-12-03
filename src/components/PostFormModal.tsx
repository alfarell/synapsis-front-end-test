import { usePostForm } from '@/context/PostFormContext';
import { createPost } from '@/services/posts';
import { CreatePostRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

type FieldType = Partial<CreatePostRequest>;

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const PostFormModal = () => {
  const router = useRouter();
  const { isModalOpen, toggleModalOpen } = usePostForm();

  const [field, setField] = useState<FieldData[]>([
    { name: ['title'], value: '' },
    { name: ['body'], value: '' }
  ]);

  const {
    mutate: mutateNewPost,
    data: postDataResult,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: createPost
  });
  const postId = postDataResult?.data?.id;

  const handleSubmit = () => {
    const postData = {
      title: field[0].value,
      body: field[1].value
    };

    mutateNewPost(postData);
  };

  useEffect(() => {
    if (isSuccess && postId) {
      toggleModalOpen();
      router.push(`/post/${postId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, postId]);

  return (
    <Modal
      title='Create Post'
      open={isModalOpen}
      width={1000}
      onOk={handleSubmit}
      onCancel={() => toggleModalOpen()}
      confirmLoading={isPending}
    >
      <Form
        name='basic'
        layout='vertical'
        fields={field}
        onFieldsChange={(_, allFields) => {
          setField(allFields);
        }}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Post title is required' }]}
          className='mb-2'
        >
          <Input width='100%' placeholder='Write you post title here...' />
        </Form.Item>
        <Form.Item<FieldType>
          label='Body'
          name='body'
          rules={[{ required: true, message: 'Post body is required' }]}
          className='mb-2'
        >
          <TextArea
            // showCount
            placeholder='Write you post body here...'
            style={{ height: 200, resize: 'none' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostFormModal;
