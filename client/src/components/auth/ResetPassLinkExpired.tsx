import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyButton from '../common/MyButton';
import { GenericDialogHeader } from './GenericDialogHeader';

const ResetPassLinkExpired: React.FC = () => {
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
        Password reset link is expired.
      </GenericDialogHeader>
      <MyButton
        color="secondary"
        type="primary"
        block
        size="large"
        onClick={() => push('../forgot-password')}
      >
        Generate Reset Link
      </MyButton>
    </>
  );
};

export default ResetPassLinkExpired;
