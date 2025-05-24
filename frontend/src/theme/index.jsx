"use client";

import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

// emotion
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// stylis
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

// custom theme
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shape from "./shape";
import shadows, { customShadows } from "./shadows";
import componentsOverride from "./overrides";
import { usePathname } from "next/navigation";

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
  const pathName = usePathname();
  const segments = pathName?.split("/");
  const lang = segments[1];
  const locale = Localization(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const styleCache = createCache({
    key: dir === "rtl" ? "muirtl" : "css",
    stylisPlugins: dir === "rtl" ? [prefixer, rtlPlugin] : [],
  });

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
