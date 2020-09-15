import { Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyButton from '../common/MyButton';
import { GenericDialogHeader } from './GenericDialogHeader';

const ResetLinkExpired: React.FC = () => {
  const { push } = useHistory();

  return (
    <>
      <GenericDialogHeader title="Invalid Reset Link">
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

export default ResetLinkExpired;
