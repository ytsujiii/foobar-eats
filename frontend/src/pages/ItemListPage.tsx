import { Button, CircularProgress, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AbstractRow from "../components/AbstractRow";
import CartView from "../components/CartView";
import GroupOrderButton from "../components/GroupOrderButton";
import Header from "../components/Header";
import MenuRow from "../components/MenuRow";
import ReceiptToggle from "../components/ReceiptToggle";
import SearchBar from "../components/SearchBar";
import useCartContext from "../hooks/useCartContext";
import useItemContext from "../hooks/useItemContext";
import styles from "./ItemListPage.module.scss";

const ItemListPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [cartViewVisible, setCartViewVisible] = useState<boolean>(false);
  const { cartItems } = useCartContext();
  const { items } = useItemContext();

  return (
    <>
      <Header />
      <Container className={styles["container"]}>
        <Typography variant="h4">Apollo&apos;s Pizza</Typography>
        <AbstractRow />
        <Typography className={styles["business-hours"]}>Open until 9:00 PM</Typography>
        <ReceiptToggle className={styles["receipt-toggle"]} />
        <GroupOrderButton className={styles["group-order-button"]} />
        <SearchBar />
        {items ? (
          items.map((item) => (
            <MenuRow
              key={item.itemId}
              name={item.name}
              price={item.price}
              onClick={() => navigate(`/items/${item.itemId}`)}
            />
          ))
        ) : (
          <div className={styles["circular-wrapper"]}>
            <CircularProgress color="success" />
          </div>
        )}
      </Container>
      <div className={styles["view-cart-button-wrapper"]}>
        <Button onClick={() => setCartViewVisible(true)} className={styles["view-cart-button"]}>
          View cart ({cartItems.length})
        </Button>
      </div>
      <CartView visible={cartViewVisible} setVisible={setCartViewVisible} onProceed={() => navigate("/delivery")} />
    </>
  );
};

export default ItemListPage;
