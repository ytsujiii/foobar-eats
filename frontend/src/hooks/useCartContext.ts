import { useContext } from "react";
import CartContext from "../contexts/CartContext";

const useCartContext = () => useContext(CartContext);

export default useCartContext;
