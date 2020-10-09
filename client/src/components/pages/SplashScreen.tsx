import React from 'react';
import MySpin from '../common/MySpin';

const SplashScreen: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column wrap',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MySpin size="large" />
      This app make by keiem, in case you don't know.
    </div>
  );
};

export default SplashScreen;
