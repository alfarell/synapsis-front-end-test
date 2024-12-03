import { useLoginDialog } from '@/context/LoginDialogContext';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { useState } from 'react';

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

  const handleSubmit = () => {
    const userData = {
      name: field[0].value,
      accessToken: field[1].value
    };

    localStorage.setItem('user_data', JSON.stringify(userData));

    handleWelcomeClose();
  };

  const handleCancel = () => {
    handleWelcomeClose();
  };

  return (
    <Modal
      title={isWelcome ? 'Welcome to BlogApp' : 'Login'}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      footer={[
        ...(isWelcome
          ? [
              <Button key='back' onClick={handleCancel}>
                Continue as Guest
              </Button>
            ]
          : []),
        <Button key='back' type='primary' onClick={handleSubmit}>
          Submit
        </Button>
      ]}
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
      </Form>
    </Modal>
  );
};

export default LoginDialog;
