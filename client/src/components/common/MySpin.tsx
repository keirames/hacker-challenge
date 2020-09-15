import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';
import React from 'react';

const spinIcon = <LoadingOutlined spin />;

const MySpin: React.FC<SpinProps> = (props) => {
  const { ...rest } = props;

  return <Spin {...rest} indicator={spinIcon} />;
};

export default MySpin;
