import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import React from "react";
import styles from "./SearchBar.module.scss";

const SearchBar = (): React.ReactElement => {
  return (
    <div className={styles["search-bar"]}>
      <Typography className={styles["text"]}>Menu</Typography>
      <SearchIcon />
    </div>
  );
};

export default SearchBar;
