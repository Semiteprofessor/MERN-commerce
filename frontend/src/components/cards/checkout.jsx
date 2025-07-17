import React from "react";
import PropTypes from "prop-types";
// next
import dynamic from "next/dynamic";
// mui
import { Typography, Card, Stack, Box, IconButton } from "@mui/material";
// icons
import { MdDeleteOutline } from "react-icons/md";
import { styled } from "@mui/material/styles";
// hooks
import { useCurrencyConvert } from "src/hooks/convertCurrency";
import { useCurrencyFormatter } from "src/hooks/formatCurrency";
// components

import BlurImage from "src/components/blurImage";
const Incrementer = dynamic(() => import("src/components/incrementer"));

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  minWidth: 40,
  objectFit: "cover",
  marginRight: theme.spacing(2),
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "hidden",
}));

const CheckoutCard = () => {
  return <div>CheckoutCard</div>;
};

export default CheckoutCard;
