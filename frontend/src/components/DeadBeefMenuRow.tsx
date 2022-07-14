import { Chip, Typography } from "@mui/material";
import React from "react";
import styles from "./MenuRow.module.scss";

const DeadBeefMenuRow = (): React.ReactElement => {
  return (
    <div className={styles["menu-row"]}>
      <div className={styles["left"]}>
        <Typography className={styles["name"]}>dead beef</Typography>
        <Typography className={styles["price"]}>¥ 0xdeadbeef</Typography>
        <Chip color="success" label="Popular" />
      </div>
      <div className={styles["thumbnail-wrapper"]}>
        <img className={styles["thumbnail"]} src="/images/deadbeef.jpg" alt="" />
      </div>
    </div>
  );
};

export default DeadBeefMenuRow;
