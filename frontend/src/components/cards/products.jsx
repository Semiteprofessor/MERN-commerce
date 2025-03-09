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
import { useDispatch } from "src/redux/store";
import { setWishlist } from "src/redux/slices/wishlist";
import {
  addCompareProduct,
  removeCompareProduct,
} from "../../redux/slices/compare";
import ColorPreviewGroup from "src/components/colorPreviewGroup";

import Label from "src/components/label";
import BlurImage from "src/components/blurImage";
// hooks
import { useCurrencyConvert } from "src/hooks/convertCurrency";
import { useCurrencyFormatter } from "src/hooks/formatCurrency";
// api
import * as api from "src/services";
// icons
import { IoMdHeartEmpty } from "react-icons/io";
import { GoEye } from "react-icons/go";
import { GoGitCompare } from "react-icons/go";
import { IoIosHeart } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
// dynamic
const ProductDetailsDialog = dynamic(() => import("../dialog/productDetails"));
const ShopProductCard = ({...props}) => {
    const { product, loading } = props;
    const cCurrency = useCurrencyConvert();
    const fCurrency = useCurrencyFormatter();

    const [open, setOpen] = useState(false);
    const [openActions, setOpenActions] = useState(false);
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    // type error
    const { wishlist } = useSelector(({ wishlist }) => wishlist);
    const { products: compareProducts } = useSelector(({ compare }) => compare);

    const { isAuthenticated } = useSelector(({ user }) => user);
    const isTablet = useMediaQuery("(max-width:900px)");
    const [isLoading, setLoading] = useState(false);
  
  return <div>ShopProductCard</div>;
};

export default ShopProductCard;
