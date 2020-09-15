import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import MyButton from '../common/MyButton';
import { GenericDialogHeader } from './GenericDialogHeader';

const SendResetMailSuccess: React.FC = () => {
  const { push } = useHistory();

  return (
    <>
      <GenericDialogHeader
        title="Forgot Password"
        icon={
          <CheckCircleOutlined
            style={{ fontSize: 40, color: '#52c41a', marginBottom: '10px' }}
          />
        }
      >
        If provided email is a registered email ID on HackerRank, you will
        receive an email with further instructions on how to reset your
        password. In case you didn't receive this email, you need to create a
        new account <Link to="signup">here</Link>
      </GenericDialogHeader>
      <MyButton
        color="secondary"
        type="primary"
        block
        size="large"
        onClick={() => push('signin')}
      >
        Sign In
      </MyButton>
    </>
  );
};

export default SendResetMailSuccess;
