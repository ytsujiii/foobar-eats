import { ThemeProvider } from "@mui/material";
import React from "react";
import "./App.css";
import THEME from "./theme";

const App = (): React.ReactElement => {
  return (
    <>
      <ThemeProvider theme={THEME}>aaa</ThemeProvider>
    </>
  );
};

export default App;
