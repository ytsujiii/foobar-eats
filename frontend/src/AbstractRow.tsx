import StarIcon from "@mui/icons-material/Star";
import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import styles from "./AbstractRow.module.scss";

const ReceiptToggle = (props: BoxProps): React.ReactElement => {
  const { className, ...restProps } = props;

  return (
    <Box className={`${styles["abstract-row"]} ${className}`} {...restProps}>
      <StarIcon className={styles["star-icon"]} />
      <Typography>2.9</Typography>
      <Typography className={styles["rating"]}>(54 ratings)</Typography>
      <Typography>・</Typography>
      <Typography>Pizza</Typography>
      <Typography>・</Typography>
      <Typography>$</Typography>
    </Box>
  );
};

export default ReceiptToggle;
