"use client";
import React from "react";
import dynamic from "next/dynamic";
// mui
import { Box, Grid } from "@mui/material";
// api
import * as api from "@/services";
import { useMutation } from "react-query";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/redux/slices/product";
// components
import PaymentSummarySkeleton from "@/components/skeletons/cart/paymentSummary";
import ShoppingCartSkeleton from "@/components/skeletons/cart/shoppingcart";
// dynamic
const ShoppingCart = dynamic(
  () => import("@/components/_main/cart/shoppingCart"),
  {
    loading: () => <ShoppingCartSkeleton />,
  }
);
const PaymentSummary = dynamic(
  () => import("@/components/_main/cart/paymentSummary"),
  {
    loading: () => <PaymentSummarySkeleton />,
  }
);

const CartMain = () => {
  return <div>CartMain</div>;
};

export default CartMain;
