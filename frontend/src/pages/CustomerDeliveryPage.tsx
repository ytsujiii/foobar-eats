import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CustomerDeliveryPage.module.scss";

const CustomerDeliveryPage = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["header"]}>
        <IconButton onClick={() => navigate("/items")} className={styles["header-arrow"]}>
          <ArrowBackIcon className={styles["arrow-icon"]} />
        </IconButton>
        <Typography className={styles["header-caption"]}>Your orders</Typography>
      </div>
      <div className={styles["orders"]}>
        <div className={styles["caption"]}>
          <Typography className={styles["caption-text"]}>Past orders</Typography>
        </div>
        <div className={styles["order-row"]}>
          <div className={styles["thumbnail-wrapper"]}>
            <img className={styles["thumbnail"]} src="/images/pizza6.jpg" alt="" />
          </div>
          <div className={styles["ordered-detail"]}>
            <Typography className={styles["ordered-shop"]}>Apollo&apos;s Pizza</Typography>
            <Typography className={styles["ordered-item-number"]}>2 item</Typography>
            <Typography className={styles["ordered-date"]}>Jan 12・Completed</Typography>
          </div>
          <Button onClick={() => navigate("/items/1")} className={styles["menu-button"]}>
            Menu
          </Button>
        </div>
        <div className={styles["order-row"]}>
          <div className={styles["thumbnail-wrapper"]}>
            <img className={styles["thumbnail"]} src="/images/pizza1.jpg" alt="" />
          </div>
          <div className={styles["ordered-detail"]}>
            <Typography className={styles["ordered-shop"]}>Domino Pizza</Typography>
            <Typography className={styles["ordered-item-number"]}>2 item</Typography>
            <Typography className={styles["ordered-date"]}>Jan 12・Completed</Typography>
          </div>
          <Button onClick={() => navigate("/items/1")} className={styles["menu-button"]}>
            Menu
          </Button>
        </div>
        <div className={styles["order-row"]}>
          <div className={styles["thumbnail-wrapper"]}>
            <img className={styles["thumbnail"]} src="/images/pizza4.jpg" alt="" />
          </div>
          <div className={styles["ordered-detail"]}>
            <Typography className={styles["ordered-shop"]}>Papa John&apos;s Pizza</Typography>
            <Typography className={styles["ordered-item-number"]}>2 item</Typography>
            <Typography className={styles["ordered-date"]}>Jan 12・Completed</Typography>
          </div>
          <Button onClick={() => navigate("/items/1")} className={styles["menu-button"]}>
            Menu
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerDeliveryPage;
