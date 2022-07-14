import { Box, Button, Typography } from "@mui/material";
import React, { useMemo } from "react";
import useCartContext from "../hooks/useCartContext";
import styles from "./CartView.module.scss";
import YenString from "./YenString";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onProceed: () => void;
}

const CartView = (props: Props): React.ReactElement => {
  const { visible, setVisible, onProceed } = props;
  const { cartItems } = useCartContext();

  const displayAttribute = useMemo<"inline-block" | "none">(() => {
    return visible ? "inline-block" : "none";
  }, [visible]);

  const Subtotal = useMemo(() => {
    let total = 0;
    cartItems.forEach((element) => {
      total += element.content.price * element.count;
    });
    return total;
  }, [cartItems]);

  return (
    <>
      <Box onClick={() => setVisible(false)} className={styles["overlay"]} sx={{ display: displayAttribute }}></Box>
      <Box className={styles["cart-view"]} sx={{ display: displayAttribute }}>
        <Typography className={styles["store-name"]}>Apollo&apos;s Pizza</Typography>
        <div className={styles["menu-list"]}>
          {cartItems.map((item) => (
            <div key={item.content.itemId} className={styles["menu"]}>
              <div className={styles["count-label-wrapper"]}>
                <Typography className={styles["count-label"]}>{item.count}</Typography>
              </div>
              <div className={styles["abstract-wrapper"]}>
                <Typography className={styles["item-name"]}>{item.content.name}</Typography>
                <Typography className={styles["detail"]}>
                  A deluxe traditional Hawaiian pizza loaded with ham, pineapple, and mozzarella cheese.
                </Typography>
              </div>
              <Typography className={styles["price"]}>
                <YenString price={item.content.price * item.count} />
              </Typography>
            </div>
          ))}
        </div>
        <div className={styles["subtotal-wrapper"]}>
          <Typography className={styles["subtotal-label"]}>Subtotal</Typography>
          <Typography className={styles["subtotal-value"]}>
            <YenString price={Subtotal} />
          </Typography>
        </div>
        <div className={styles["go-to-checkout-button-wrapper"]}>
          <Button onClick={onProceed} className={styles["go-to-checkout-button"]}>
            Go to checkout
          </Button>
        </div>
      </Box>
    </>
  );
};

export default CartView;
