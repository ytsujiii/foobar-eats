import { ThemeProvider } from "@mui/material";
import React from "react";
import ItemListPage from "./ItemListPage";
import THEME from "./theme";

const App = (): React.ReactElement => {
  return (
    <>
      <ThemeProvider theme={THEME}>
        <ItemListPage />
      </ThemeProvider>
    </>
  );
};

export default App;
