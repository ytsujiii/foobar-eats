import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton, Typography } from "@mui/material";
import React, { useCallback, useMemo, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YenString from "../components/YenString";
import useCartContext from "../hooks/useCartContext";
import useItemContext from "../hooks/useItemContext";
import Item from "../types/Item";
import styles from "./ItemDetailPage.module.scss";

type CountReducerAction = "increment" | "decrement";

const ItemDetailPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { itemId: itemIdString } = useParams();
  const { addItem } = useCartContext();
  const { findItem } = useItemContext();

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
  const item = useMemo<Item | undefined>(() => findItem(itemId), [findItem]);
  const amount = useMemo<number>(() => {
    if (!item?.price) return 0;
    return item.price * count;
  }, [item, count]);
  const addToCartButtonDisabled = useMemo<boolean>(() => count <= 0, [count]);

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
        <img className={styles["thumbnail"]} src={item?.imagePath} alt="" />
      </div>
      <div className={styles["abstract"]}>
        <Typography variant="h5">{item?.name}</Typography>
        <Typography variant="h6">{item ? <YenString price={item.price} /> : ""}</Typography>
        <Typography className={styles["description"]}>{item?.description}</Typography>
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
        <Button onClick={addToCart} disabled={addToCartButtonDisabled} className={styles["add-to-cart-button"]}>
          Add to cart
          {amount ? (
            <>
              ・<YenString price={amount} />
            </>
          ) : (
            ""
          )}
        </Button>
      </div>
    </>
  );
};

export default ItemDetailPage;
