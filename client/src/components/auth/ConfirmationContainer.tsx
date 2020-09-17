import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { confirmation } from '../../services/authService';
import MySpin from '../common/MySpin';
import AuthBanner from './AuthBanner';
import ConfirmationLinkExpired from './ConfirmationLinkExpired';
import ConfirmationSuccess from './ConfirmationSuccess';
import { GenericDialogHeader } from './GenericDialogHeader';
import { SPanel, SResetPasswordContainer } from './ResetPasswordContainer';

const ConfirmationContainer: React.FC = () => {
  const { params } = useRouteMatch<{ confirmationToken: string }>();
  const [isExpired, setIsExpired] = useState<boolean | null>(null);

  useEffect(() => {
    const confirmationAccount = async () => {
      try {
        await confirmation(params.confirmationToken);
        setIsExpired(false);
      } catch (error) {
        setIsExpired(true);
      }
    };

    confirmationAccount();
  }, [params.confirmationToken]);

  if (isExpired === null)
    return (
      <SConfirmationContainer>
        <AuthBanner />
        <SPanel>
          <GenericDialogHeader title="Checking token">
            We are checking validity of your confirmation link, please wait.
          </GenericDialogHeader>
          <MySpin style={{ margin: 'auto', width: '100%' }} />
        </SPanel>
      </SConfirmationContainer>
    );

  return (
    <SConfirmationContainer>
      <AuthBanner />
      <SPanel>
        {isExpired ? <ConfirmationLinkExpired /> : <ConfirmationSuccess />}
      </SPanel>
    </SConfirmationContainer>
  );
};

const SConfirmationContainer = styled(SResetPasswordContainer)``;

export default ConfirmationContainer;
