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
import { useCurrencyConvert } from "@/hooks/convertCurrency";
import { useCurrencyFormatter } from "@/hooks/formatCurrency";
// components

import BlurImage from "@/components/blurImage";
const Incrementer = dynamic(() => import("@/components/incrementer"));

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
  const { onDelete, onIncreaseQuantity, onDecreaseQuantity, cart } = props;
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return;
  <Box
    sx={{
      "& .card-main": {
        p: 2,
        borderWidth: "1px 0 0 0",
        "& .delete-icon": {
          fontSize: 20,
        },
      },
      display: { sm: "none", xs: "block" },
    }}
  ></Box>;
};

export default CheckoutCard;
