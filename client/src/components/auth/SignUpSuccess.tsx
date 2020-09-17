import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyButton from '../common/MyButton';
import { GenericDialogHeader } from './GenericDialogHeader';

const SignUpSuccess: React.FC<{ email: string }> = (props) => {
  const { push } = useHistory();

  return (
    <>
      <GenericDialogHeader
        title="Sign Up Successful"
        icon={
          <CheckCircleOutlined
            style={{ fontSize: 40, color: '#52c41a', marginBottom: '10px' }}
          />
        }
      >
        Awesome. You have successfully sign up your account. Next step you need
        to check your email for confirm account.
        <p>
          Your email is <strong>{props.email}</strong>
        </p>
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

export default SignUpSuccess;
