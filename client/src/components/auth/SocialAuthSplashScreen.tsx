import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  deleteAuthCookie,
  getAuthCookie,
  signInWithJwt,
} from '../../services/authService';
import MySpin from '../common/MySpin';

const SocialAuthSplashScreen: React.FC = () => {
  const { params } = useRouteMatch<{ type: 'signin' | 'merge' }>();
  const { push } = useHistory();

  const { type } = params;

  useEffect(() => {
    if (type === 'merge') {
      push('../../settings');
    }

    if (type === 'signin') {
      const jwt = getAuthCookie();
      if (jwt) {
        signInWithJwt(jwt);
        deleteAuthCookie();
        window.location.href = '/';
      }
    }

    window.location.href = '/';
  }, [push, type]);

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column wrap',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MySpin size="large" />
      Authorization... It's will take a few seconds.
    </div>
  );
};

export default SocialAuthSplashScreen;
