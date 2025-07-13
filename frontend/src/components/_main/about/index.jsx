"use client";
import React from "react";
// material ui
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
// images
import AboutImage from "../../../../public/images/about-1.png";
import AboutImage2 from "../../../../public/images/about-2.png";
// components
import WhyUs from "../home/whyUs";
import Team from "./team";

const Data = [
  {
    name: "Vendors",
    range: "65k+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
  {
    name: "Earnings",
    range: "$45B+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
  {
    name: "Sold",
    range: "25M+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
  {
    name: "Products",
    range: "70k+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
];
const Index = () => {
  return <div>Index</div>;
};

export default Index;
