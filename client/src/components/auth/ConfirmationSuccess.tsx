import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyButton from '../common/MyButton';
import { GenericDialogHeader } from './GenericDialogHeader';

const ConfirmationSuccess: React.FC = () => {
  const { push } = useHistory();

  return (
    <>
      <GenericDialogHeader
        title="Account is activaed"
        icon={
          <CheckCircleOutlined
            style={{ fontSize: 40, color: '#52c41a', marginBottom: '10px' }}
          />
        }
      >
        Your account is activated. You can sign in now.
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

export default ConfirmationSuccess;
