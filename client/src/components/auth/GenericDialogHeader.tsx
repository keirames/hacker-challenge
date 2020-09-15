import { Typography } from 'antd';
import React from 'react';

interface Props {
  icon?: React.ReactNode;
  title: string;
}

export const GenericDialogHeader: React.FC<Props> = (props) => {
  const { icon: Icon, title, children } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      {Icon !== undefined && Icon}
      <Typography.Title level={3}>{title}</Typography.Title>
      <Typography.Paragraph>{children}</Typography.Paragraph>
    </div>
  );
};
