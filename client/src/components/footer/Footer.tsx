import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme/theme";

const Footer: React.FC = (props) => {
  return (
    <SFooter>
      <span>Created by @ithkkeii. Copyright©2020, All rights reserved.</span>
    </SFooter>
  );
};

const SFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;
  background: ${({ theme }: { theme: STheme }) =>
    theme.palette.background.white};
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkBlue};

  & > span {
    cursor: pointer;
  }
`;

export default Footer;
