import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { checkResetPasswordToken } from '../../services/authService';
import { STheme } from '../../theme/theme';
import MySpin from '../common/MySpin';
import AuthBanner from './AuthBanner';
import ResetPassLinkExpired from './ResetPassLinkExpired';
import ResetPassword from './ResetPassword';
import ResetSuccess from './ResetSuccess';

const ResetPasswordContainer: React.FC = () => {
  const [isValidResetLink, setIsValidResetLink] = useState<boolean | null>(
    null
  );
  const [showResetSuccess, setShowResetSuccess] = useState<boolean>(false);
  const { params } = useRouteMatch<{ resetPasswordToken: string }>();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await checkResetPasswordToken(params.resetPasswordToken);
        setIsValidResetLink(true);
      } catch (error) {
        setIsValidResetLink(false);
      }
    };

    checkToken();
  }, [params.resetPasswordToken]);

  const handleConditionView = (): JSX.Element => {
    if (showResetSuccess) return <ResetSuccess />;

    if (isValidResetLink === null) return <MySpin />;

    if (isValidResetLink)
      return (
        <ResetPassword
          resetPasswordToken={params.resetPasswordToken}
          onShowResetSuccess={(state: boolean) => setShowResetSuccess(state)}
        />
      );

    return <ResetPassLinkExpired />;
  };

  return (
    <SResetPasswordContainer>
      <AuthBanner />
      <SPanel>{handleConditionView()}</SPanel>
    </SResetPasswordContainer>
  );
};

export const SResetPasswordContainer = styled.div`
  margin: auto;
  padding: 50px 0;
  width: 500px;
`;

export const SPanel = styled.div`
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[1]};
  border-radius: 6px;
  padding: 20px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
`;

export default ResetPasswordContainer;
