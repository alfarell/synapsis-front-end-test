import { useLoginDialog } from '@/context/LoginDialogContext';
import { USERS_QUERY } from '@/libs/react-query';
import { userLogin } from '@/services/users';
import { UserData } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Button, Form, Input, Modal, Typography } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const { Text } = Typography;

type FieldType = {
  Name?: string;
  accessToken?: string;
};
interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const LoginDialog = () => {
  const { isOpen, isWelcome, handleWelcomeClose } = useLoginDialog();
  const [field, setField] = useState<FieldData[]>([
    { name: ['Name'], value: '' },
    { name: ['Access Token'], value: '' }
  ]);

  const {
    mutate: mutateLogin,
    isPending: loginPending,
    isSuccess,
    error
  } = useMutation({
    mutationFn: userLogin
  });

  const handleSubmit = async () => {
    const userData = {
      name: field[0].value,
      accessToken: field[1].value
    };

    mutateLogin(userData);
  };

  const handleCancel = () => {
    handleWelcomeClose();
  };

  useEffect(() => {
    if (isSuccess) handleWelcomeClose();
  }, [isSuccess, handleWelcomeClose]);

  return (
    <Modal
      title={isWelcome ? 'Welcome to BlogApp' : 'Login'}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='Login'
      cancelText='Continue as Guest'
      cancelButtonProps={{
        hidden: !isWelcome,
        disabled: loginPending
      }}
      confirmLoading={loginPending}
    >
      <div className='mb-2'>
        <Text>
          Please input your name and access token before accessing BlogApp
        </Text>
      </div>
      <Form
        name='basic'
        layout='vertical'
        fields={field}
        onFieldsChange={(_, allFields) => {
          setField(allFields);
        }}
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Name'
          name='Name'
          rules={[{ required: true, message: 'Please input your name!' }]}
          className='mb-2'
        >
          <Input width='100%' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Access Token'
          name='accessToken'
          rules={[
            { required: true, message: 'Please input your access token!' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item hidden>
          <Button block type='primary' htmlType='submit'>
            Log in
          </Button>
        </Form.Item>

        {!loginPending && error && (
          <Alert
            message='Login Failed'
            description={error?.message}
            type='error'
            closable
          />
        )}
      </Form>
    </Modal>
  );
};

export default LoginDialog;
