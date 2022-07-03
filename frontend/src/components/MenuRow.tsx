import { Chip, Typography } from "@mui/material";
import React from "react";
import styles from "./MenuRow.module.scss";

interface Props {
  onClick?: () => void;
}

const MenuRow = (props: Props): React.ReactElement => {
  const { onClick } = props;

  return (
    <div className={styles["menu-row"]} onClick={onClick}>
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
