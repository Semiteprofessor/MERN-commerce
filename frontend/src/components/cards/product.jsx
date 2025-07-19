"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

// mui
import {
  Box,
  Card,
  Typography,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
  Skeleton,
  Zoom,
} from "@mui/material";
// components
import { useDispatch } from "@/redux/store";
import { setWishlist } from "@/redux/slices/wishlist";
import {
  addCompareProduct,
  removeCompareProduct,
} from "../../redux/slices/compare";
import ColorPreviewGroup from "@/components/colorPreviewGroup";

const ShopProductCard = () => {
  return <div>ShopProductCard</div>;
};

export default ShopProductCard;
