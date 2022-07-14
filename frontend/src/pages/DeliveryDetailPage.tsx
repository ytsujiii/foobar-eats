import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Container, IconButton, ToggleButton, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api";
import ProgressHover from "../components/ProgressHover";
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import YenString from "../components/YenString";
import useCartContext from "../hooks/useCartContext";
import Order from "../types/Order";
import styles from "./DeliveryDetailPage.module.scss";

const DeliveryDetailPage = (): React.ReactElement => {
  const navigate = useNavigate();

  const [alignment, setAlignment] = useState<"delivery" | "pickup" | string>("delivery");
  const [loading, setLoading] = useState<boolean>(false);
  const { cartItems, total } = useCartContext();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };
  const sendOrder = useCallback(() => {
    const itemIds: number[] = [];
    const itemCounts: number[] = [];
    cartItems.forEach((item) => {
      itemIds.push(item.content.itemId);
      itemCounts.push(item.count);
    });

    const order: Order = {
      customerId: 1,
      itemIds: itemIds,
      itemCounts: itemCounts,
    };

    setLoading(true);
    Api.sendOrder(order)
      .then(() => navigate("/orders"))
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [cartItems]);

  return (
    <>
      <Container className={styles["container"]}>
        <div className={styles["cancel-button-row"]}>
          <IconButton onClick={() => navigate("/items")} className={styles["cancel-button"]}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="h4" className={styles["title"]}>
          Delivery details
        </Typography>
        <ToggleButtonGroup value={alignment} onChange={handleChange} className={styles["toggle-button-group"]}>
          <ToggleButton value="delivery" className={styles["toggle-button"]}>
            <Typography className={styles["receipt"]}>Delivery</Typography>
          </ToggleButton>
          <ToggleButton value="pickup" className={styles["toggle-button"]}>
            <Typography className={styles["receipt"]}>Pickup</Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        <div className={styles["delivery-option-row"]}>
          <FmdGoodIcon className={styles["leading-icon"]} />
          <div className={styles["delivery-option-container"]}>
            <Typography className={styles["label"]}>home</Typography>
            <Typography className={styles["detail"]}>1191 2nd Ave, Seattle, WA</Typography>
          </div>
          <ChevronRightIcon />
        </div>
        <div className={styles["delivery-option-row"]}>
          <PersonIcon className={styles["leading-icon"]} />
          <div className={styles["delivery-option-container"]}>
            <Typography className={styles["label"]}>Meet at door</Typography>
          </div>
          <ChevronRightIcon />
        </div>

        <div className={styles["delivery-time-row"]}>
          <Typography className={styles["label"]}>Delivery Time</Typography>
          <Typography className={styles["value"]}>30-45 min</Typography>
        </div>

        <div className={styles["items-label-row"]}>
          <Typography className={styles["label"]}>Your items</Typography>
          <Button className={styles["see-menu-button"]}>See menu</Button>
        </div>

        <div className={styles["menu-list"]}>
          {cartItems.map((item) => (
            <div key={item.content.itemId}>
              <div className={styles["menu"]}>
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
                  <YenString price={item.content.price} />
                </Typography>
              </div>
            </div>
          ))}
          <div className={styles["add-item-button-row"]}>
            <Button className={styles["add-item-button"]} startIcon={<AddIcon />}>
              Add items
            </Button>
          </div>
        </div>

        <div className={styles["fee-detail"]}>
          <div className={styles["fee-row"]}>
            <Typography>Subtotal</Typography>
            <Typography>
              <YenString price={total} />
            </Typography>
          </div>
          <div className={styles["fee-row"]}>
            <Typography>Delivery Fee</Typography>
            <Typography>
              <YenString price={0} />
            </Typography>
          </div>
          <div className={styles["fee-row"]}>
            <Typography className={styles["label-total"]}>Total</Typography>
            <Typography className={styles["value-total"]}>
              <YenString price={total} />
            </Typography>
          </div>
        </div>
      </Container>
      <div className={styles["footer"]}>
        <Button onClick={sendOrder} className={styles["confirm-button"]}>
          Confirm・
          <YenString price={total} />
        </Button>
      </div>
      {!loading || <ProgressHover />}
    </>
  );
};

export default DeliveryDetailPage;
