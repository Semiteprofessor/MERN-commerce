"use client";
import React from "react";
import PropTypes from "prop-types";

// mui
import { alpha, styled, useTheme } from "@mui/material/styles";

const RootStyle = styled("span")(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === "light";
  const { color, variant } = ownerState;

  const styleFilled = (color) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    textTransform: "capitalize",
  });

  const styleOutlined = (color) => ({
    color: theme.palette[color].main,
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette[color].main}`,
    textTransform: "capitalize",
  });

  const styleGhost = (color) => ({
    color: theme.palette[color][isLight ? "dark" : "light"],
    backgroundColor: alpha(theme.palette[color].main, 0.16),
    textTransform: "capitalize",
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 4,
    cursor: "default",
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== "default"
      ? {
          ...(variant === "filled" && { ...styleFilled(color) }),
          ...(variant === "outlined" && { ...styleOutlined(color) }),
          ...(variant === "ghost" && { ...styleGhost(color) }),
        }
      : {
          ...(variant === "outlined" && {
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === "ghost" && {
            color: isLight
              ? theme.palette.text.secondary
              : theme.palette.common.white,
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

const Label = ({
  color = "default",
  variant = "ghost",
  children,
  ...other
}) => {
  const theme = useTheme();
  return (
    <RootStyle ownerState={{ color, variant }} theme={theme} {...other}>
      {children}
    </RootStyle>
  );
};

Label.propTypes = {
  color: PropTypes.oneOf(["default", "primary", "secondary", "customColor"]),
  variant: PropTypes.oneOf(["filled", "outlined", "ghost"]),
  children: PropTypes.node.isRequired,
};

Label.defaultProps = {
  color: "default",
  variant: "ghost",
};

export default Label;
  