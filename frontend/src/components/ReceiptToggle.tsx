import { ToggleButton, ToggleButtonGroupProps, Typography } from "@mui/material";
import React from "react";
import styles from "./ReceiptToggle.module.scss";
import ToggleButtonGroup from "./ToggleButtonGroup";

const ReceiptToggle = (props: ToggleButtonGroupProps): React.ReactElement => {
  const { className, ...restProps } = props;
  const [alignment, setAlignment] = React.useState("delivery");

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      onChange={handleChange}
      className={`${styles["toggle-button-group"]} ${className}`}
      {...restProps}
    >
      <ToggleButton value="delivery" className={styles["toggle-button"]}>
        <Typography className={styles["receipt"]}>Delivery</Typography>
        <Typography className={styles["required-time"]}>30-45 min・$9.49</Typography>
      </ToggleButton>
      <ToggleButton value="pickup" className={styles["toggle-button"]}>
        <Typography className={styles["receipt"]}>Pickup</Typography>
        <Typography className={styles["required-time"]}>5-15 min・0.2mi</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ReceiptToggle;
