"use client";
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useSelector } from "react-redux";
// mui
import {
  CardContent,
  Typography,
  Stack,
  Divider,
  Skeleton,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks components
import { useCurrencyConvert } from "src/hooks/convertCurrency";
import { useCurrencyFormatter } from "src/hooks/formatCurrency";
import RootStyled from "./styled";
// images
import paymentImg from "../../../../../public/images/payment-method.png";

PaymentSummary.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const PaymentSummary = ({ loading, cart }) => {
  const { product } = useSelector((state) => state);
  const { total, shipping, subtotal } = product.checkout;

  const router = useRouter();

  const isEmptyCart = cart.length === 0;

  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();

  return <div>PaymentSummary</div>;
};

export default PaymentSummary;
