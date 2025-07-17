"use client";
import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
// mui
import {
  Card,
  Button,
  CardHeader,
  Typography,
  Box,
  Skeleton,
  Stack,
  Divider,
} from "@mui/material";
import { sum } from "lodash";
// formik
import { useFormik, Form, FormikProvider } from "formik";
// icons
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
  getCart,
  resetCart,
} from "src/redux/slices/product";
// component
import CheckoutCard from "src/components/cards/checkout";
import CheckoutProductList from "src/components/lists/checkoutProduct";
// Styled
import RootStyled from "./styled";

ShoppingCart.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const EmptyCart = dynamic(() => import("src/illustrations/emptyCart"), {
  loading: () => (
    <Stack>
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  ),
});
// ----------------------------------------------------------------------

const ShoppingCart = () => {
  return <div>ShoppingCart</div>;
};

export default ShoppingCart;
