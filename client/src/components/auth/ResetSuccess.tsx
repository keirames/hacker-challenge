import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyButton from '../common/MyButton';
import { GenericDialogHeader } from './GenericDialogHeader';

const ResetSuccess: React.FC = () => {
  const { push } = useHistory();

  return (
    <>
      <GenericDialogHeader
        title="Password Reset Successful"
        icon={
          <CheckCircleOutlined
            style={{ fontSize: 40, color: '#52c41a', marginBottom: '10px' }}
          />
        }
      >
        Awesome. You have successfully reset the password for your account.
      </GenericDialogHeader>
      <MyButton
        color="secondary"
        type="primary"
        block
        size="large"
        onClick={() => push('../signin')}
      >
        Sign In
      </MyButton>
    </>
  );
};

export default ResetSuccess;
