import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Chip, ChipProps } from "@mui/material";
import React from "react";

const GroupOrderButton = (props: ChipProps): React.ReactElement => {
  return <Chip icon={<GroupAddIcon />} label="Group order" sx={{ padding: "8px" }} {...props} />;
};

export default GroupOrderButton;
