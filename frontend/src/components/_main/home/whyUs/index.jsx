"use client";
// react
import React from "react";
// mui
import { Typography, Card, Stack, Divider } from "@mui/material";

// icons
import { MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { MdSettingsBackupRestore } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";

const WhyUs = () => {
    const data = [
      {
        title: "Free Shipping",
        icon: <AiOutlineShoppingCart size={40} />,
        description: " When you spend $100+",
      },
      {
        title: "Feedbacks",
        icon: <VscFeedback size={40} />,
        description: "100% Customer",
      },
      {
        title: "Free Return",
        icon: <MdSettingsBackupRestore size={40} />,
        description: "30 Day Returns Policy",
      },
      {
        title: "Secure System",
        icon: <RiExchangeDollarLine size={40} />,
        description: "100% Secure Gaurantee",
      },
      {
        title: "Online Supports",
        icon: <MdOutlineSupportAgent size={40} />,
        description: "24/7 Dedicated Support.",
      },
    ];
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "12px",

        display: {
          md: "block",
          xs: "none",
        },
        // borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        spacing={1}
      ></Stack>
    </Card>
  );
};

export default WhyUs;
