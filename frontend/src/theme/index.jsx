"use client";

import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

// custom theme
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shape from "./shape";
import shadows, { customShadows } from "./shadows";
import componentsOverride from "./overrides";

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired,
};

const Localization = (lang) => {
  switch (lang) {
    case "ar":
      return "arEG";
    case "fr":
      return "frFR";
    case "en":
      return "enUS";

    default:
      return "frFR";
  }
};
const ThemeRegistry = ({ children }) => {
  const { themeMode } = useSelector((state) => state.settings);

  const customTheme = () => {
    createTheme({
      palette:
        themeMode === "dark"
          ? { ...palette.dark, mode: "dark" }
          : { ...palette.light, mode: "light" },
          direction: dir,
    });
  };
  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider
        theme={{
          ...customTheme(),
          components: componentsOverride(customTheme()),
        }}
      ></ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeRegistry;
