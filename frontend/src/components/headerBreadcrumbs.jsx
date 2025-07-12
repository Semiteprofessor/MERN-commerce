//
"use client";
import { isString } from "lodash";
import PropTypes from "prop-types";
import NextLink from "next/link";

// mui
import {
  Box,
  Link,
  Button,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";

// components
import { MBreadcrumbs } from "./@material-extend";
import { createGradient } from "@/theme/palette";

const headerBreadcrumbs = ({ ...props }) => {
  const {
    links,
    action,
    icon,
    heading,
    moreLink = "" || [],
    sx,
    admin,
    ...other
  } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...sx,
        width: "100%",
        ...(admin && {
          mb: 3,
        }),
        ...(!admin && {
          p: 3,
          mt: 3,
          color: "common.white",
          position: "relative",
          overflow: "hidden",
          background: createGradient(
            theme.palette.primary.main,
            theme.palette.primary.dark
          ),
          borderRadius: "8px",
          border: `1px solid ${theme.palette.primary}`,
          "&:before": {
            content: "''",
            position: "absolute",
            top: "-23%",
            left: "20%",
            transform: "translateX(-50%)",
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: "50px",
            zIndex: 0,
          },
          "&:after": {
            content: "''",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-3%",
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: "50px",
            zIndex: 0,
          },
          "& .MuiBreadcrumbs-separator": {
            color: "common.white",
          },
        }),
      }}
    >
      headerBreadcrumbs
    </Box>
  );
};

export default headerBreadcrumbs;
