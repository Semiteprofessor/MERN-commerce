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

const headerBreadcrumbs = () => {
  return <div>headerBreadcrumbs</div>;
};

export default headerBreadcrumbs;
