import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Container, IconButton, ToggleButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api";
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import useCartContext from "../hooks/useCartContext";
import styles from "./DeliveryDetailPage.module.scss";

const DeliveryDetailPage = (): React.ReactElement => {
  const navigate = useNavigate();

  const [alignment, setAlignment] = React.useState("delivery");
  const { cartItems } = useCartContext();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };
  const sendOrder = () => {
    Api.sendOrder({ customerId: 1, itemIds: [2, 3], itemCounts: [0, 0] });
  };

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
            <>
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
                <Typography className={styles["price"]}>¥{item.content.price}</Typography>
              </div>
              <div className={styles["add-item-button-row"]}>
                <Button className={styles["add-item-button"]} startIcon={<AddIcon />}>
                  Add items
                </Button>
              </div>
            </>
          ))}
        </div>

        <div className={styles["fee-detail"]}>
          <div className={styles["fee-row"]}>
            <Typography>Subtotal</Typography>
            <Typography>$8.99</Typography>
          </div>
          <div className={styles["fee-row"]}>
            <Typography>Delivery Fee</Typography>
            <Typography>$0.00</Typography>
          </div>
          <div className={styles["fee-row"]}>
            <Typography className={styles["label-total"]}>Total</Typography>
            <Typography className={styles["value-total"]}>$8.99</Typography>
          </div>
        </div>
      </Container>
      <div className={styles["footer"]}>
        <Button onClick={sendOrder} className={styles["confirm-button"]}>
          Confirm・$8.99
        </Button>
      </div>
    </>
  );
};

export default DeliveryDetailPage;
