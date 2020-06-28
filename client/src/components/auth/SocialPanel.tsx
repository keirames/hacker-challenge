import React, { useEffect } from "react";
import styled from "styled-components";
import { STheme } from "../../theme/theme";
import { Button, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  navigateToSocialProvider,
  getCookie,
  signInWithJwt,
  deleteCookie,
} from "../../services/authService";

const SocialPanel: React.FC = (props) => {
  useEffect(() => {
    const jwt = getCookie("Authentication");
    if (jwt) {
      signInWithJwt(jwt);
      deleteCookie("Authentication");
      // window.location.href = "/";
    }
  }, []);

  return (
    <SSocialPanel>
      <Typography variant="h5">Social Account</Typography>
      <span>Select any provider !</span>
      <SocialProvider
        label="github"
        color="#333333"
        provider="github"
        icon={<FontAwesomeIcon icon={["fab", "github-alt"]} />}
      />
      <SocialProvider
        label="facebook"
        color="#3B5899"
        provider="facebook"
        icon={<FontAwesomeIcon icon={["fab", "facebook"]} />}
      />
      <SocialProvider
        label="google"
        color="#CB4024"
        provider="google"
        icon={<FontAwesomeIcon icon={["fab", "google-plus-g"]} />}
      />
    </SSocialPanel>
  );
};

interface Props {
  color: string;
  label: string;
  provider: "github" | "facebook" | "google";
  icon: React.ReactNode;
}

const SocialProvider: React.FC<Props> = ({ label, color, provider, icon }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={icon}
      style={{ color: "white", backgroundColor: color }}
      onClick={() => navigateToSocialProvider(provider)}
    >
      {label}
    </Button>
  );
};

const SSocialPanel = styled.div`
  width: 300px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  padding: 20px;
  border-radius: 5px;
  text-align: center;

  & > button {
    margin: 15px 0;
  }
`;

export default SocialPanel;
