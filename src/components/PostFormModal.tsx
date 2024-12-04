import { ModalType, usePostForm } from '@/context/PostFormContext';
import { createPost, deletePost, editPost } from '@/services/posts';
import { CreatePostRequest } from '@/types';
import { parseErrorData } from '@/utils/parseError';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Form, Input, Modal, Spin } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const { TextArea } = Input;
const { confirm } = Modal;

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
  const pathname = usePathname();

  const { isModalOpen, modalType, editData, handleCloseModal } = usePostForm();
  const isCreatePost = modalType === ModalType.create;
  const isEditPost = modalType === ModalType.edit;

  const [field, setField] = useState<FieldData[]>([
    { name: ['title'], value: editData?.title },
    { name: ['body'], value: editData?.body }
  ]);

  const {
    mutate: mutateNewPost,
    data: postDataResult,
    isPending: isNewPostPending,
    isSuccess: isNewPostSuccess,
    error: newPostError
  } = useMutation({
    mutationFn: createPost
  });
  const {
    mutate: mutateUpdatePost,
    isPending: isUpdatePostPending,
    isSuccess: isUpdatePostSuccess,
    error: updatePostError
  } = useMutation({
    mutationFn: editPost
  });
  const {
    mutate: mutateDeletePost,
    isPending: isDeletePostPending,
    isSuccess: isDeletePostSuccess,
    error: deletePostError
  } = useMutation({
    mutationFn: deletePost
  });
  const postId = postDataResult?.data?.id;
  const isLoading = useMemo(() => {
    return isNewPostPending || isUpdatePostPending || isDeletePostPending;
  }, [isNewPostPending, isUpdatePostPending, isDeletePostPending]);
  const mutateErrors = useMemo(() => {
    return newPostError || updatePostError || deletePostError;
  }, [newPostError, updatePostError, deletePostError]);

  const handleSubmit = () => {
    const postData = {
      title: field[0].value,
      body: field[1].value
    };

    if (isCreatePost) mutateNewPost(postData);
    else mutateUpdatePost({ postId: editData?.id, postData });
  };

  const handleDeletePost = () => {
    confirm({
      title: 'Are you sure want to delete this post?',
      onOk: () => mutateDeletePost(editData?.id)
    });
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
    if (!isNewPostPending && isNewPostSuccess && postId) {
      handleCloseModal();
      router.push(`/post/${postId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewPostPending, isNewPostSuccess, postId]);

  useEffect(() => {
    if (!isUpdatePostPending && isUpdatePostSuccess) {
      handleCloseModal();
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatePostPending, isUpdatePostSuccess]);

  useEffect(() => {
    if (!isDeletePostPending && isDeletePostSuccess) {
      handleCloseModal();

      if (pathname === '/') router.refresh();
      else router.replace(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeletePostPending, isDeletePostSuccess]);

  return (
    <Modal
      title={isCreatePost ? 'Create Post' : 'Edit Post'}
      open={isModalOpen}
      width={1000}
      onOk={handleSubmit}
      onCancel={() => handleCloseModal()}
      // confirmLoading={isNewPostPending || isUpdatePostPending}
      footer={[
        <div key='actions' className='flex items-center'>
          {isLoading ? (
            <Spin className='m-auto' />
          ) : (
            <>
              {isEditPost && (
                <Button
                  key='delete'
                  color='danger'
                  variant='outlined'
                  className='mr-auto'
                  icon={<DeleteOutlined />}
                  onClick={handleDeletePost}
                >
                  Delete
                </Button>
              )}
              <Button
                key='cancel'
                className='ml-auto mr-2'
                onClick={() => handleCloseModal()}
              >
                Cancel
              </Button>
              <Button key='submit' type='primary' onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </div>
      ]}
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

      {!isLoading && mutateErrors && (
        <Alert
          message='Error:'
          description={parseErrorData(mutateErrors)}
          type='error'
          closable
        />
      )}
    </Modal>
  );
};

export default PostFormModal;
