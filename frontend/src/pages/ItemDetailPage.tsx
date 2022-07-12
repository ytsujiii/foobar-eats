import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";
import useCartContext from "../hooks/useCartContext";
import Item from "../types/Item";
import styles from "./ItemDetailPage.module.scss";

type CountReducerAction = "increment" | "decrement";

const ItemDetailPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { itemId: itemIdString } = useParams();
  const [item, setItem] = useState<Item>();
  const { addItem } = useCartContext();

  const countReducer = (state: number, action: CountReducerAction): number => {
    switch (action) {
      case "increment":
        return state + 1;
      case "decrement":
        if (state <= 0) return 0;
        return state - 1;
    }
  };
  const [count, dispatch] = useReducer(countReducer, 0);

  const itemId = useMemo(() => Number(itemIdString), [itemIdString]);
  const amount = useMemo<number>(() => {
    if (!item?.price) return 0;
    return item.price * count;
  }, [item, count]);

  useEffect(() => {
    if (!itemId) return;

    Api.getItem(itemId).then((response) => setItem(response));
  }, [itemIdString]);

  const addToCart = useCallback(() => {
    if (!itemId || !item) return;

    addItem(item, count);
    navigate("/items");
  }, [itemId, count, item, addItem]);

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
        <IconButton onClick={() => dispatch("decrement")} className={styles["count-button"]}>
          <RemoveIcon />
        </IconButton>
        <Typography className={styles["count-value"]}>{count}</Typography>
        <IconButton onClick={() => dispatch("increment")} className={styles["count-button"]}>
          <AddIcon />
        </IconButton>
      </div>
      <div className={styles["footer"]}>
        <Button onClick={addToCart} className={styles["add-to-cart-button"]}>
          Add to cart{!amount || `・¥${amount}`}
        </Button>
      </div>
    </>
  );
};

export default ItemDetailPage;
