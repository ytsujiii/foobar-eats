import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import styles from "./Header.module.scss";

const Header = (): React.ReactElement => {
  return (
    <AppBar>
      <Toolbar>
        <Box className={styles["margin"]} />
        <Typography className={styles["title"]} variant="h6">
          a
        </Typography>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
