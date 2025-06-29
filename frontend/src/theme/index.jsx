"use client";

import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import React from "react";

const ThemeRegistry = ({ children }) => {
  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={{ ...customTheme(), components:componentsOverride() }}></ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeRegistry;
