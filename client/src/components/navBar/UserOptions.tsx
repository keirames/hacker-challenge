import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STheme } from '../../theme/theme';
import { signOut } from '../../services/authService';

const UserOptions: React.FC = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleTrigger = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleSignOut = () => {
    signOut();
    window.location.href = '/';
  };

  return (
    <SUserOptions>
      <span>Hello</span>
      <FontAwesomeIcon icon="id-card" size="2x" />
      <FontAwesomeIcon icon="angle-down" size="1x" />
    </SUserOptions>
    // <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
    //   <SUserOptions onClick={handleTrigger}>
    //     <FontAwesomeIcon icon="id-card" size="2x" />
    //     <FontAwesomeIcon icon="angle-down" size="1x" />
    //     <Popper
    //       id={Boolean(anchorEl) ? "simple-popper" : undefined}
    //       open={Boolean(anchorEl)}
    //       anchorEl={anchorEl}
    //     >
    //       <Paper elevation={3} style={{ padding: "10px" }}>
    //         <Button
    //           variant="contained"
    //           color="secondary"
    //           fullWidth
    //           onClick={handleSignOut}
    //         >
    //           Sign Out
    //         </Button>
    //       </Paper>
    //     </Popper>
    //   </SUserOptions>
    // </ClickAwayListener>
  );
};

const SUserOptions = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.white};
  cursor: pointer;

  & > * {
    margin-right: 10px;
  }
`;

export default UserOptions;
