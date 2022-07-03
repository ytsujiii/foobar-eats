import { Chip, Typography } from "@mui/material";
import React from "react";
import styles from "./MenuRow.module.scss";

const MenuRow = (): React.ReactElement => {
  return (
    <div className={styles["menu-row"]}>
      <div className={styles["left"]}>
        <Typography className={styles["name"]}>Fantastic Pizza</Typography>
        <Typography className={styles["price"]}>$8.99</Typography>
        <Typography className={styles["description"]}>
          A deluxe traditional Hawaiian pizza loaded with ham, pineapple, and mozzarella cheese.
        </Typography>
        <Chip color="success" label="Popular" />
      </div>
      <div className={styles["thumbnail-wrapper"]}>
        <img className={styles["thumbnail"]} src="/images/pizza1.jpg" alt="" />
      </div>
    </div>
  );
};

export default MenuRow;
