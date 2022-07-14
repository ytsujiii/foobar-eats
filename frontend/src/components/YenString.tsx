import React from "react";

interface Props {
  price: number;
}

const ReceiptToggle = (props: Props): React.ReactElement => {
  const { price } = props;

  return <>¥ {price.toLocaleString()}</>;
};

export default ReceiptToggle;
