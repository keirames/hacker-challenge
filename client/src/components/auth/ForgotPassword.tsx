import React, { useState } from 'react';
import { Form, Input, Typography } from 'antd';
import styled from 'styled-components';
import { Store } from 'antd/lib/form/interface';
import { Link } from 'react-router-dom';
import AuthBanner from './AuthBanner';
import MyButton from '../common/MyButton';
import { STheme } from '../../theme/theme';
import { forgotPassword } from '../../services/authService';
import SendResetMailSuccess from './SendResetMailSuccess';
import { GenericDialogHeader } from './GenericDialogHeader';

const ForgotPassword: React.FC = () => {
  const [sentMail, setSentMail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendResetLink = async (values: Store) => {
    try {
      setLoading(true);
      await forgotPassword(values.email);
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
    setSentMail(true);
  };

  return (
    <SForgotPassword>
      <AuthBanner />
      {sentMail ? (
        <SPanel>
          <SendResetMailSuccess />
        </SPanel>
      ) : (
        <SPanel>
          <GenericDialogHeader title="Forgot Password">
            No Problem! Enter your email or username below and we will send you
            an email with instruction to reset your password.
          </GenericDialogHeader>
          <Form
            name="basic"
            layout="vertical"
            hideRequiredMark
            onFinish={handleSendResetLink}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" size="large" />
            </Form.Item>
            <Form.Item>
              <MyButton
                color="thirdary"
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                Send Reset Link
              </MyButton>
            </Form.Item>
            <Typography.Paragraph>
              Back to <Link to="signin">Sign In</Link>
            </Typography.Paragraph>
          </Form>
        </SPanel>
      )}
    </SForgotPassword>
  );
};

const SForgotPassword = styled.div`
  margin: auto;
  padding: 50px 0;
  width: 500px;

  .title {
    text-align: center;
    padding: 10px 0;
  }
`;

const SPanel = styled.div`
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[1]};
  border-radius: 6px;
  padding: 20px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
`;

export default ForgotPassword;
