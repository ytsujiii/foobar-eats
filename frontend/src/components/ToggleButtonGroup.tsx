import { ToggleButtonGroup as ToggleButtonGroupBase, ToggleButtonGroupProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledToggleButtonGroup = styled(ToggleButtonGroupBase)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,

    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected": {
      backgroundColor: "white",
      borderRadius: "25px",
    },
  },
  "& .MuiToggleButtonGroup-root": {
    backgroundColor: "white",
    borderRadius: "25px",
  },
}));

const ToggleButtonGroup = (props: ToggleButtonGroupProps): React.ReactElement => {
  return (
    <StyledToggleButtonGroup
      sx={{ backgroundColor: "#eee", height: "50px", borderRadius: "25px" }}
      size="small"
      fullWidth
      exclusive
      aria-label="text alignment"
      {...props}
    >
      {props.children}
    </StyledToggleButtonGroup>
  );
};

export default ToggleButtonGroup;
