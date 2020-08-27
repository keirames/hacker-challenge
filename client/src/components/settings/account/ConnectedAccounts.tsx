import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import Provider from '../../provider/Provider';
import { UserExternalLogin } from '../../../graphql';

interface Props {
  externalLogins: UserExternalLogin[];
  children?: React.ReactNode;
}

const ConnectedAccounts: React.FC<Props> = ({ externalLogins, children }) => {
  const [provider, setProvider] = useState<string[]>([]);

  useEffect(() => {
    const connectedProviderName = externalLogins.map(
      (e) => e.externalAuthenticationProvider.name
    );
    setProvider(connectedProviderName);
  }, [externalLogins]);

  return (
    <SConnectedAccounts>
      {children}
      {(['github', 'facebook', 'google'] as const).map((p) => {
        const isConnected = provider.includes(p);
        return (
          <Row gutter={[8, 16]} key={p} align="middle">
            <Col span={isConnected ? 4 : 12}>
              <Provider provider={p} type="merge" block disabled={isConnected}>
                {isConnected ? '' : `connect to ${p}`}
              </Provider>
            </Col>
            {isConnected ? (
              <Col span={8}>
                <SNorti>{p} is connected</SNorti>
              </Col>
            ) : null}
          </Row>
        );
      })}
    </SConnectedAccounts>
  );
};

const SConnectedAccounts = styled.div``;

const SNorti = styled.span`
  text-transform: capitalize;
  font-weight: 500;
`;

export default ConnectedAccounts;
