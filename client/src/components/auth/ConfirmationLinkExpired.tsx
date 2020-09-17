import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { GenericDialogHeader } from './GenericDialogHeader';
import MyButton from '../common/MyButton';

const ConfirmationLinkExpired: React.FC = () => {
  const { push } = useHistory();

  return (
    <>
      <GenericDialogHeader
        title="Invalid Reset Link"
        icon={
          <CloseCircleOutlined
            style={{ fontSize: 40, color: '#ff3547', marginBottom: '10px' }}
          />
        }
      >
        Confirmation link is expired. Your account is also deleted.
      </GenericDialogHeader>
      <MyButton
        color="secondary"
        type="primary"
        block
        size="large"
        onClick={() => push('../signup')}
      >
        Sign Up
      </MyButton>
    </>
  );
};

export default ConfirmationLinkExpired;
