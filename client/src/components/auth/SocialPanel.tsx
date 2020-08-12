import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigateToSocialProvider } from "../../services/authService";
import MyButton from "../common/MyButton";
import { Typography, Space } from "antd";

const SocialPanel: React.FC = (props) => {
  return (
    <SSocialPanel direction="vertical" size="middle">
      <div>
        <Typography.Title level={4}>Social Account</Typography.Title>
        <span>Select any provider !</span>
      </div>
      <MyButton
        color="primary"
        type="primary"
        block
        style={{
          backgroundColor: "#2f2e41",
          borderColor: "#2f2e41",
        }}
        onClick={() => navigateToSocialProvider("github")}
      >
        <FontAwesomeIcon
          icon={["fab", "github-alt"]}
          style={{ marginRight: "10px" }}
        />
        github
      </MyButton>
      <MyButton
        color="primary"
        type="primary"
        block
        onClick={() => navigateToSocialProvider("facebook")}
      >
        <FontAwesomeIcon
          icon={["fab", "facebook"]}
          style={{ marginRight: "10px" }}
        />
        facebook
      </MyButton>
      <MyButton
        color="thirdary"
        type="primary"
        block
        onClick={() => navigateToSocialProvider("google")}
      >
        <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
        google
      </MyButton>
    </SSocialPanel>
  );
};

const SSocialPanel = styled(Space)`
  width: 300px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

export default SocialPanel;
