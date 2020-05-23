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
import { STheme } from "../../theme";
import { ISortTypes } from "../page/ContestDetailsPage";

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
  onChangeSortTypes?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortType: ISortTypes;
}

const SortTable: React.FC<IProps> = (props) => {
  const { style, sortType, onChangeSortTypes: onChangeSortType } = props;

  return (
    <SSortTable style={style}>
      <FormGroup>
        <FormControlLabel
          control={<GreenCheckBox checked={false} name="solved" size="small" />}
          label={<Typography variant="body2">Solved</Typography>}
        />
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={false}
              name="unsolved"
              size="small"
              onChange={onChangeSortType}
            />
          }
          label={<Typography variant="body2">Unsolved</Typography>}
        />
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={sortType.easy}
              name="easy"
              size="small"
              onChange={onChangeSortType}
            />
          }
          label={<Typography variant="body2">Easy</Typography>}
        />
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={sortType.medium}
              name="medium"
              size="small"
              onChange={onChangeSortType}
            />
          }
          label={<Typography variant="body2">Medium</Typography>}
        />
        <FormControlLabel
          control={
            <GreenCheckBox
              checked={sortType.hard}
              name="hard"
              size="small"
              onChange={onChangeSortType}
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
    ${({ theme }: { theme: STheme }) => theme.palette.common.grey};
  padding-left: 20px;
`;

export default SortTable;
