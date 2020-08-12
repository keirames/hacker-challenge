import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme/theme";
import { LevelFilter, StatusFilter } from "../page/ContestDetailsPage";
import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

interface Props {
  style?: React.CSSProperties;
  levelFilter: LevelFilter;
  statusFilter: StatusFilter;
  onChangeLevelFilter?: (checkedValue: CheckboxValueType[]) => void;
  onChangeStatusFilter?: (checkedValue: CheckboxValueType[]) => void;
}

const statusOptions = [
  { label: "Solved", value: "solved" },
  { label: "Unsolved", value: "unsolved" },
];

const levelOptions = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const SortTable: React.FC<Props> = (props) => {
  const {
    style,
    levelFilter,
    statusFilter,
    onChangeLevelFilter,
    onChangeStatusFilter,
  } = props;

  return (
    <SSortTable style={style}>
      <Checkbox.Group
        options={statusOptions}
        defaultValue={["solved", "unsolved"]}
        style={{ display: "flex", flexFlow: "column nowrap" }}
        onChange={onChangeStatusFilter}
      />
      <Checkbox.Group
        options={levelOptions}
        defaultValue={["easy", "medium", "hard"]}
        style={{ display: "flex", flexFlow: "column nowrap" }}
        onChange={onChangeLevelFilter}
      />
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

  .ant-checkbox-group,
  .ant-checkbox-group-item {
    margin: 5px 0;
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
