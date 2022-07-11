import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api";
import AbstractRow from "../components/AbstractRow";
import CartView from "../components/CartView";
import GroupOrderButton from "../components/GroupOrderButton";
import Header from "../components/Header";
import MenuRow from "../components/MenuRow";
import ReceiptToggle from "../components/ReceiptToggle";
import SearchBar from "../components/SearchBar";
import Item from "../types/Item";
import styles from "./ItemListPage.module.scss";

const ItemListPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [cartViewVisible, setCartViewVisible] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    Api.getItems().then((response) => setItems(response));
  }, []);

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
        {items.map((item) => (
          <MenuRow
            key={item.itemId}
            name={item.name}
            price={item.price}
            onClick={() => navigate(`/items/${item.itemId}`)}
          />
        ))}
      </Container>
      <div className={styles["view-cart-button-wrapper"]}>
        <Button onClick={() => setCartViewVisible(true)} className={styles["view-cart-button"]}>
          View cart (1)
        </Button>
      </div>
      <CartView visible={cartViewVisible} setVisible={setCartViewVisible} onProceed={() => navigate("/delivery")} />
    </>
  );
};

export default ItemListPage;
