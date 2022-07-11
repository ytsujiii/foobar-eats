import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";
import Item from "../types/Item";
import styles from "./ItemDetailPage.module.scss";

const ItemDetailPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { itemId: itemIdString } = useParams();
  const [item, setItem] = useState<Item>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const itemId = Number(itemIdString);

    if (!itemId) return;

    Api.getItem(itemId).then((response) => setItem(response));
  }, [itemIdString]);

  return (
    <>
      <div className={styles["cancel-button-wrapper"]}>
        <IconButton onClick={() => navigate("/items")} className={styles["cancel-button"]}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles["thumbnail-wrapper"]}>
        <img className={styles["thumbnail"]} src="/images/pizza1.jpg" alt="" />
      </div>
      <div className={styles["abstract"]}>
        <Typography variant="h5">{item?.name}</Typography>
        <Typography variant="h6">¥{item?.price}</Typography>
        <Typography className={styles["description"]}>
          A deluxe traditional Hawaiian pizza loaded with ham, pineapple, and mozzarella cheese.
        </Typography>
      </div>
      <Typography className={styles["heading"]}>Special Instructions</Typography>
      <div className={styles["count-input-form-group"]}>
        <IconButton onClick={() => setCount(count - 1)} className={styles["count-button"]}>
          <RemoveIcon />
        </IconButton>
        <Typography className={styles["count-value"]}>{count}</Typography>
        <IconButton onClick={() => setCount(count + 1)} className={styles["count-button"]}>
          <AddIcon />
        </IconButton>
      </div>
      <div className={styles["footer"]}>
        <Button onClick={() => navigate("/items")} className={styles["add-to-cart-button"]}>
          Add to cart・$8.99
        </Button>
      </div>
    </>
  );
};

export default ItemDetailPage;
