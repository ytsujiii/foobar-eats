import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemListPage from "./pages/ItemListPage";
import THEME from "./theme";

const App = (): React.ReactElement => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={THEME}>
          <Routes>
            <Route path="/items" element={<ItemListPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
