"use client";
import React from "react";
import PropTypes from "prop-types";
import RouterLink from "next/link";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { FaAngleRight } from "react-icons/fa6";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  List,
  Card,
  ListItem,
  Typography,
  Stack,
  Button,
  Skeleton,
} from "@mui/material";
// api
import * as api from "src/services";
import { useQuery } from "react-query";
// redux
import { setShops } from "src/redux/slices/shops";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 40;
// ----------------------------------------------------------------------

const MegaMenu = () => {
  return <div>MegaMenu</div>;
};

export default MegaMenu;
