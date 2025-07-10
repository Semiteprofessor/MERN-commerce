"use client";
// react
import React from "react";
import NextLink from "next/link";
// mui
import { Typography, Box, Button, Stack } from "@mui/material";
// api
import * as api from "src/services";
import { useQuery } from "react-query";
// components
import ProductsCarousel from "src/components/carousels/gridSlider";
// icons
import { IoIosArrowForward } from "react-icons/io";

const Index = () => {
  const { data, isLoading } = useQuery(["get-top-products"], () =>
    api.getTopRatedProducts()
  );

  return <div>Index</div>;
};

export default Index;
