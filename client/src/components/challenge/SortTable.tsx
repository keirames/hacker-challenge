import React from "react";
import styled from "styled-components";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  withStyles,
  CheckboxProps,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { STheme } from "../../theme/theme";
import { ILevelFilter, IStatusFilter } from "../page/ContestDetailsPage";

const GreenCheckBox = withStyles({
  root: {
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface IProps {
  style?: React.CSSProperties;
  levelFilter: ILevelFilter;
  statusFilter: IStatusFilter;
  onChangeLevelFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStatusFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortTable: React.FC<IProps> = (props) => {
  const {
    style,
    levelFilter,
    statusFilter,
    onChangeLevelFilter,
    onChangeStatusFilter,
  } = props;

  return (
    <SSortTable style={style}>
      <FormGroup>
        <p className="title">Status</p>
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={statusFilter.solved}
              name="solved"
              size="small"
              onChange={onChangeStatusFilter}
            />
          }
          label={<Typography variant="body2">Solved</Typography>}
        />
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={statusFilter.unsolved}
              name="unsolved"
              size="small"
              onChange={onChangeStatusFilter}
            />
          }
          label={<Typography variant="body2">Unsolved</Typography>}
        />
      </FormGroup>
      <FormGroup>
        <p className="title">Level</p>
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={levelFilter.easy}
              name="easy"
              size="small"
              onChange={onChangeLevelFilter}
            />
          }
          label={<Typography variant="body2">Easy</Typography>}
        />
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={levelFilter.medium}
              name="medium"
              size="small"
              onChange={onChangeLevelFilter}
            />
          }
          label={<Typography variant="body2">Medium</Typography>}
        />
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={levelFilter.hard}
              name="hard"
              size="small"
              onChange={onChangeLevelFilter}
            />
          }
          label={<Typography variant="body2">Hard </Typography>}
        />
      </FormGroup>
    </SSortTable>
  );
};

const SSortTable = styled.div`
  border-left: 1px solid
    ${({ theme }: { theme: STheme }) => theme.palette.common.lightGrey};
  padding-left: 20px;

  & > :first-child {
    border-bottom: 1px solid
      ${({ theme }: { theme: STheme }) => theme.palette.common.lightGrey};
  }

  & > * {
    margin-top: 10px;
  }

  .title {
    margin: 0;
    font-size: ${({ theme }: { theme: STheme }) =>
      theme.typography.fontSize.large};
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.grey};
    font-weight: lighter;
  }
`;

export default SortTable;
