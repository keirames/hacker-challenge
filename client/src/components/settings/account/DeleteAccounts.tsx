import React from 'react';
import styled from 'styled-components';
import MyButton from '../../common/MyButton';

interface Props {
  children?: React.ReactNode;
}

const DeleteAccounts: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
      <MyButton
        color="thirdary"
        type="primary"
        style={{ textTransform: 'capitalize' }}
      >
        Delete
      </MyButton>
    </div>
  );
};

export default DeleteAccounts;
