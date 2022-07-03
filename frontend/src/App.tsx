import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemDetailPage from "./pages/ItemDetailPage";
import ItemListPage from "./pages/ItemListPage";
import THEME from "./theme";

const App = (): React.ReactElement => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={THEME}>
          <Routes>
            <Route path="/items" element={<ItemListPage />} />
            <Route path="/items/:itemId" element={<ItemDetailPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
