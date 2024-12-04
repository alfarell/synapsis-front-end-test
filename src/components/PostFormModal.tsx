import { ModalType, usePostForm } from '@/context/PostFormContext';
import { createPost, editPost } from '@/services/posts';
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
  const { isModalOpen, modalType, editData, handleCloseModal } = usePostForm();
  const isCreatePost = modalType === ModalType.create;

  const [field, setField] = useState<FieldData[]>([
    { name: ['title'], value: editData?.title },
    { name: ['body'], value: editData?.body }
  ]);

  const {
    mutate: mutateNewPost,
    data: postDataResult,
    isPending: isNewPostPending,
    isSuccess: isNewPostSuccess
  } = useMutation({
    mutationFn: createPost
  });
  const {
    mutate: mutateUpdatePost,
    isPending: isUpdatePostPending,
    isSuccess: isUpdatePostSuccess
  } = useMutation({
    mutationFn: editPost
  });
  const postId = postDataResult?.data?.id;

  const handleSubmit = () => {
    const postData = {
      title: field[0].value,
      body: field[1].value
    };

    if (isCreatePost) mutateNewPost(postData);
    else mutateUpdatePost({ postId: editData?.id, postData });
  };

  useEffect(() => {
    if (editData) {
      setField([
        { name: ['title'], value: editData?.title },
        { name: ['body'], value: editData?.body }
      ]);
    }
  }, [editData]);

  useEffect(() => {
    if (isNewPostSuccess && postId) {
      handleCloseModal();
      router.push(`/post/${postId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewPostSuccess, postId]);

  useEffect(() => {
    if (!isUpdatePostPending && isUpdatePostSuccess) {
      handleCloseModal();
      router.push(`/post/${editData?.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatePostSuccess]);

  return (
    <Modal
      title={isCreatePost ? 'Create Post' : 'Edit Post'}
      open={isModalOpen}
      width={1000}
      onOk={handleSubmit}
      onCancel={() => handleCloseModal()}
      confirmLoading={isNewPostPending || isUpdatePostPending}
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
          initialValue={editData?.title}
          rules={[{ required: true, message: 'Post title is required' }]}
          className='mb-2'
        >
          <Input width='100%' placeholder='Write you post title here...' />
        </Form.Item>
        <Form.Item<FieldType>
          label='Body'
          name='body'
          initialValue={editData?.body}
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
