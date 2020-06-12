import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme/theme";

const Burger: React.FC = (props) => {
  return (
    <SBuger>
      <div />
      <div />
      <div />
    </SBuger>
  );
};

const SBuger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30px;
  height: 20px;

  & > div {
    width: 100%;
    height: 2px;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.white};
    border-radius: 5px;
  }
`;

export default Burger;
