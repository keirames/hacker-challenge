import { Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import React, { useState } from 'react';
import { resetPassword } from '../../services/authService';
import MyButton from '../common/MyButton';
import { GenericDialogHeader } from './GenericDialogHeader';

interface Props {
  resetPasswordToken: string;
  onShowResetSuccess: (state: boolean) => void;
}

const ResetPassword: React.FC<Props> = (props) => {
  const { resetPasswordToken, onShowResetSuccess } = props;

  const [inProgress, setInProgress] = useState<boolean>(false);
  const [form] = useForm();

  const handleChangePassword = async (values: Store) => {
    if (values.password.length < 5) {
      form.setFields([
        {
          name: 'password',
          errors: ['Password length must be over 5 characters.'],
        },
      ]);
      return;
    }

    if (values.password !== values.passwordRetyped) {
      form.setFields([
        {
          name: 'passwordRetyped',
          errors: ['Retype password does not match.'],
        },
      ]);
      return;
    }

    try {
      setInProgress(true);
      await resetPassword(values.password, resetPasswordToken);
      onShowResetSuccess(true);
    } catch (error) {
      notification.error({
        message: 'Something wrong happened.',
        description: error.response.data.message,
      });
    }
    setInProgress(false);
  };

  return (
    <>
      <GenericDialogHeader title="Change Your Password">
        Looks like you are trying to reset the password for the account. Please
        enter your new password twice. So we can verify you typed it correctly.
        When complete, you are good to go.
      </GenericDialogHeader>
      <Form
        name="basic"
        layout="vertical"
        hideRequiredMark
        form={form}
        onFinish={handleChangePassword}
      >
        <Form.Item
          label="New password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="passwordRetyped"
          rules={[{ required: true, message: 'Please retype your password!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item>
          <MyButton
            color="thirdary"
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={inProgress}
          >
            Change Password
          </MyButton>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPassword;
