import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { STheme } from '../../theme/theme';

const Links: React.FC = (props) => {
  return (
    <SLinks>
      <ul>
        <li>
          <NavLink activeClassName="selected" to="/contests">
            CONTESTS
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/practice">
            PRACTICE
          </NavLink>
        </li>
      </ul>
    </SLinks>
  );
};

const SLinks = styled.div`
  width: 15%;

  & > ul {
    display: flex;
    justify-content: space-around;

    & > li {
      list-style: none;
      font-weight: bold;
      cursor: pointer;
      letter-spacing: 1px;

      & > a {
        color: ${({ theme }: { theme: STheme }) => theme.palette.common.white};
        text-decoration: none;

        &::after {
          content: '';
          background-color: transparent;
          display: block;
          border-bottom: 2px solid;
          border-bottom-color: ${({ theme }: { theme: STheme }) =>
            theme.palette.common.lightGreen};
          transform: scale(0);
          transition: 0.2s ease-in-out;
        }

        &:hover {
          &::after {
            transform: scale(1);
          }
        }

        &.selected {
          &::after {
            transform: scale(1);
          }
        }
      }
    }
  }
`;

export default Links;
