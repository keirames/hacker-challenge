import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from 'antd';
import { STheme } from '../../theme/theme';
import MyButton from '../common/MyButton';

//! This interface is common use, need refactor
interface IProps {
  contest: {
    id: string;
    name: string;
    slug: string;
  };
}

const CategoryBlock: React.FC<IProps> = ({ contest }) => {
  const { name, slug } = contest;

  return (
    <Link
      to={`contests/${slug}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <SContestBlock>
        <Typography.Title
          level={4}
          style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          {name}
        </Typography.Title>
        <Typography.Paragraph>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci,
          veritatis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Accusantium, quasi?
        </Typography.Paragraph>
        <MyButton color="secondary" type="primary" size="large">
          Get Start
        </MyButton>
      </SContestBlock>
    </Link>
  );
};

const SContestBlock = styled.div`
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[3]};
  padding: 20px;
  cursor: pointer;

  & > * {
    margin-top: 10px;
  }
`;

export default CategoryBlock;
