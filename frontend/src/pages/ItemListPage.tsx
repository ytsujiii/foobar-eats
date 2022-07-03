import { Container, Typography } from "@mui/material";
import React from "react";
import AbstractRow from "../components/AbstractRow";
import GroupOrderButton from "../components/GroupOrderButton";
import Header from "../components/Header";
import MenuRow from "../components/MenuRow";
import ReceiptToggle from "../components/ReceiptToggle";
import SearchBar from "../components/SearchBar";
import styles from "./ItemListPage.module.scss";

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
