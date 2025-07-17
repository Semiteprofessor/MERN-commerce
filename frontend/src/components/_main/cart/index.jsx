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
  const dispatch = useDispatch();
  const { checkout } = useSelector(({ product }) => product);
  const { cart } = checkout;
  const [loading, setLoading] = React.useState(true);
  const { mutate } = useMutation(api.getCart, {
    onSuccess: (res) => {
      setLoading(false);
      dispatch(getCart(res.data));
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      setLoading(false);
      toast.error(message ? JSON.parse(message) : "Something went wrong!");
    },
  });
  React.useEffect(() => {
    setLoading(true);
    mutate(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>CartMain</div>;
};

export default CartMain;
