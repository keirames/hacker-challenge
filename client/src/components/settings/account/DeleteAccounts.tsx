import { gql, useMutation } from '@apollo/client';
import { Alert, Input, Modal, notification } from 'antd';
import React, { useRef, useState } from 'react';
import { removeToken } from '../../../services/authService';
import MyButton from '../../common/MyButton';

interface Props {
  children?: React.ReactNode;
}

const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount
  }
`;

const DeleteAccounts: React.FC<Props> = ({ children }) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
  const [sureText, setSureText] = useState<string>('');
  const [allowDelete, setAllowDelete] = useState<boolean>(false);

  const ref = useRef<string>('i am sure');

  const [deleteAccount, { error, loading }] = useMutation(DELETE_ACCOUNT);

  const handleSureText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSureText(e.target.value);
    if (e.target.value === ref.current) {
      setAllowDelete(true);
      return;
    }
    setAllowDelete(false);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
    removeToken();
    window.location.href = '/';
  };

  if (error) {
    notification.error({
      message: 'Fail to delete account.',
      description: error.message,
    });
  }

  return (
    <div>
      {children}
      <MyButton
        color="thirdary"
        type="primary"
        style={{ textTransform: 'capitalize' }}
        onClick={() => setShowDeleteWarning(true)}
      >
        Delete
      </MyButton>
      <Modal
        visible={showDeleteWarning}
        onCancel={() => setShowDeleteWarning(false)}
        title="Are you absolutely sure?"
        destroyOnClose={true}
        footer={
          <MyButton
            color="thirdary"
            type="primary"
            block
            disabled={!allowDelete}
            loading={loading}
            onClick={handleDeleteAccount}
          >
            i understand consequences, delete account
          </MyButton>
        }
        bodyStyle={{ padding: '16px' }}
      >
        <Alert
          message="Unexpected bad things will happen if you don’t read this!"
          type="error"
        />
        <div style={{ margin: '10px 0 0 0' }}>
          <p>
            This action cannot be undone. This will permanently delete the
            account.
          </p>
          <p>
            Delete your account and all information related to your account such
            as your profile page, badges earned and leaderboard positions.
          </p>
          <p>
            This will not change your billing plan. If you want to downgrade,
            you can do so in your Billing Settings.
          </p>
          <p>
            Please type <strong>i am sure</strong> to confirm.
          </p>
        </div>
        <Input value={sureText} onChange={handleSureText} />
      </Modal>
    </div>
  );
};

export default DeleteAccounts;
