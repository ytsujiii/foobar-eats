import { Container, Typography } from "@mui/material";
import React from "react";
import AbstractRow from "./AbstractRow";
import GroupOrderButton from "./GroupOrderButton";
import Header from "./Header";
import styles from "./ItemListPage.module.scss";
import MenuRow from "./MenuRow";
import ReceiptToggle from "./ReceiptToggle";
import SearchBar from "./SearchBar";

const ItemListPage = (): React.ReactElement => {
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
        <MenuRow />
        <MenuRow />
        <MenuRow />
        <MenuRow />
        <MenuRow />
      </Container>
    </>
  );
};

export default ItemListPage;
