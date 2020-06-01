import React, { useState } from "react";
import { Challenge } from "../../graphql";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Theme,
  withStyles,
  createStyles,
} from "@material-ui/core";
import styled from "styled-components";
import { STheme } from "../../theme";
import Problem from "./Problem";
import Submissions from "./Submissions";

interface IProps {
  style?: React.CSSProperties;
  challenge: Challenge;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
};

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(0),
      "&:hover": {
        color: theme.palette.common.black,
        opacity: 1,
      },
      "&$selected": {
        color: theme.palette.common.black,
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: theme.palette.background.default,
      },
      "&:focus": {
        color: theme.palette.common.black,
        backgroundColor: theme.palette.background.default,
      },
    },
    selected: {},
  })
)((props: { label: string }) => <Tab {...props} />);

const ChallengeDetails: React.FC<IProps> = (props) => {
  const { title } = props.challenge;

  const [tabValue, setTabValue] = useState<number>(0);

  return (
    <div style={props.style}>
      <SHeader>
        Breedcum
        <Typography variant="h4">{title}</Typography>
      </SHeader>
      <Tabs
        value={tabValue}
        onChange={(e: React.ChangeEvent<{}>, value: number) =>
          setTabValue(value)
        }
      >
        <AntTab label="Problem" />
        <AntTab label="Submissions" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Problem challenge={props.challenge} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Submissions />
      </TabPanel>
    </div>
  );
};

const SHeader = styled.div`
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[2]};
  padding: 20px;
  margin: 10px 0;
  background: ${({ theme }: { theme: STheme }) =>
    theme.palette.background.white};
`;

export default ChallengeDetails;
