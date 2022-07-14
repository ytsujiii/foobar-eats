import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "./ProgressHover.module.scss";

const ProgressHover = (): React.ReactElement => {
  return (
    <div className={styles["root"]}>
      <CircularProgress color="success" className={styles["circular"]} />
    </div>
  );
};

export default ProgressHover;
