import { useContext } from "react";
import ItemContext from "../contexts/ItemContext";

const useItemContext = () => useContext(ItemContext);

export default useItemContext;
