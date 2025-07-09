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

import Label from "@/components/label";
import BlurImage from "@/components/blurImage";

// hooks
import { useCurrencyConvert } from "@/hooks/convertCurrency";
import { useCurrencyFormatter } from "@/hooks/formatCurrency";

// api
import * as api from "@/services";

// icons
import { IoMdHeartEmpty } from "react-icons/io";
import { GoEye } from "react-icons/go";
import { GoGitCompare } from "react-icons/go";
import { IoIosHeart } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";

// dynamic
const ProductDetailsDialog = dynamic(() => import("../dialog/productDetails"));
const ShopProductCard = ({ ...props }) => {
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

  const { mutate } = useMutation(api.updateWishlist, {
    onSuccess: (data) => {
      toast.success(data.message);
      setLoading(false);
      dispatch(setWishlist(data.data));
    },
    onError: (err) => {
      setLoading(false);
      const message = JSON.stringify(err.response.data.message);
      toast.error(
        t(
          message
            ? t("common:" + JSON.parse(message))
            : t("common:something-wrong")
        )
      );
    },
  });

  const { name, slug, image, _id, averageRating } = !loading && product;
  const linkTo = `/product/${slug ? slug : ""}`;

  const onClickWishList = async (event) => {
    if (!isAuthenticated) {
      event.stopPropagation();
      router.push("/auth/login");
    } else {
      event.stopPropagation();
      setLoading(true);
      await mutate(_id);
    }
  };
  const onAddCompare = async (event) => {
    event.stopPropagation();
    toast.success("Added to compare list");
    dispatch(addCompareProduct(product));
  };

  const onRemoveCompare = async (event) => {
    event.stopPropagation();
    toast.success("Removed from compare list");
    dispatch(removeCompareProduct(_id));
  };
  return <div>ShopProductCard</div>;
};

export default ShopProductCard;
