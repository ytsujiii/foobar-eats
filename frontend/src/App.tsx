import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeliveryDetailPage from "./pages/DeliveryDetailPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import Item1DetailPage from "./pages/Item1DetailPage";
import ItemListPage from "./pages/ItemListPage";
import THEME from "./theme";

const App = (): React.ReactElement => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={THEME}>
          <Routes>
            <Route path="/items" element={<ItemListPage />} />
            <Route path="/items/1" element={<Item1DetailPage />} />
            <Route path="/items/:itemId" element={<ItemDetailPage />} />
            <Route path="/delivery" element={<DeliveryDetailPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
