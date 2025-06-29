"use client";

import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import React from "react";

// custom theme
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shape from './shape';
import shadows, { customShadows } from './shadows';
import componentsOverride from './overrides';

const ThemeRegistry = ({ children }) => {
  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={{ ...customTheme(), components:componentsOverride() }}></ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeRegistry;
