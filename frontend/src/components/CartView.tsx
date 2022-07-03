import { Box, Button, Typography } from "@mui/material";
import React, { useMemo } from "react";
import styles from "./CartView.module.scss";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartView = (props: Props): React.ReactElement => {
  const { visible, setVisible } = props;

  const displayAttribute = useMemo<"inline-block" | "none">(() => {
    return visible ? "inline-block" : "none";
  }, [visible]);

  return (
    <>
      <Box onClick={() => setVisible(false)} className={styles["overlay"]} sx={{ display: displayAttribute }}></Box>
      <Box className={styles["cart-view"]} sx={{ display: displayAttribute }}>
        <Typography className={styles["store-name"]}>Apollo&apos;s Pizza</Typography>
        <div className={styles["menu-list"]}>
          <div className={styles["menu"]}>
            <div className={styles["count-label-wrapper"]}>
              <Typography className={styles["count-label"]}>1</Typography>
            </div>
            <div className={styles["abstract-wrapper"]}>
              <Typography className={styles["item-name"]}>Fantastic Pizza</Typography>
              <Typography className={styles["detail"]}>
                A deluxe traditional Hawaiian pizza loaded with ham, pineapple, and mozzarella cheese.
              </Typography>
            </div>
            <Typography className={styles["price"]}>$8.99</Typography>
          </div>
        </div>
        <div className={styles["subtotal-wrapper"]}>
          <Typography className={styles["subtotal-label"]}>Subtotal</Typography>
          <Typography className={styles["subtotal-value"]}>$8.99</Typography>
        </div>
        <div className={styles["go-to-checkout-button-wrapper"]}>
          <Button className={styles["go-to-checkout-button"]}>Go to checkout</Button>
        </div>
      </Box>
    </>
  );
};

export default CartView;
