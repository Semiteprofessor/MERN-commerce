"use client";
import React from "react";
import NextLink from "next/link";

// mui
import { Typography, Box, Stack, Button } from "@mui/material";
// api
import * as api from "@/services";
import { useQuery } from "react-query";
// components
import ProductsCarousel from "src/components/carousels/gridSlider";
// icons
import { IoIosArrowForward } from "react-icons/io";

const Featured = () => {
    const { data, isLoading } = useQuery(["get-best-products"], () =>
      api.getBestSellingProducts()
    );
  
  return <div>Featured</div>;
};

export default Featured;
