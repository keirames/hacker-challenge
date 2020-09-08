import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from 'antd';
import Level from './Level';
import { STheme } from '../../theme/theme';
import MyButton from '../common/MyButton';
import { Challenge } from '../../graphql';

const ChallengeBlock: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const { slug, title, points, level, isSolved } = challenge;

  const { pathname } = useLocation();

  return (
    <SChallengeBlock>
      <div>
        <Typography.Title
          level={4}
          style={{
            marginBottom: '5px',
            textTransform: 'capitalize',
            fontWeight: 500,
          }}
        >
          {title}
        </Typography.Title>
        <Level level={level} style={{ display: 'inline-block' }} />
        <Typography.Paragraph
          style={{ display: 'inline-block', fontWeight: 'lighter' }}
        >
          , Max Score: {points}
        </Typography.Paragraph>
      </div>
      <Link to={`${pathname}/${slug}`} style={{ textDecoration: 'none' }}>
        <MyButton color="secondary" type="primary" size="middle">
          {isSolved && <FontAwesomeIcon icon="check-circle" />}
          {isSolved ? 'solved challenge' : 'solve challenge'}
        </MyButton>
      </Link>
    </SChallengeBlock>
  );
};

const SChallengeBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 4px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[1]};
`;

export default ChallengeBlock;
