import { Chip, Typography } from "@mui/material";
import React from "react";
import Item from "../types/Item";
import styles from "./MenuRow.module.scss";
import YenString from "./YenString";

interface Props {
  item: Item;
  onClick?: () => void;
}

const MenuRow = (props: Props): React.ReactElement => {
  const { item, onClick } = props;

  return (
    <div className={styles["menu-row"]} onClick={onClick}>
      <div className={styles["left"]}>
        <Typography className={styles["name"]}>{item.name}</Typography>
        <Typography className={styles["price"]}>
          <YenString price={item.price} />
        </Typography>
        <Typography className={styles["description"]}>{item.description}</Typography>
        <Chip color="success" label="Popular" />
      </div>
      <div className={styles["thumbnail-wrapper"]}>
        <img className={styles["thumbnail"]} src={item.imagePath} alt="" />
      </div>
    </div>
  );
};

export default MenuRow;
