"use client";
import React from "react";
import Link from "next/link";
// mui
import { Box, Typography, Grid, Button, Container, Stack } from "@mui/material";
// icons
import { IoIosArrowForward } from "react-icons/io";

// blur image
import bannerImg from "../../../../../public/images/banner-3.png";
// components
import BlurImage from "@/components/blurImage";

const Banner = () => {
  return (
    <Box
      sx={{
        mt: 4,
        overflow: "hidden",
        position: "relative",
        display: { md: "block", xs: "none" },
      }}
    >
      <Box
        sx={{
          mt: 3,
          py: 12,
          position: "relative",
        }}
      >
        <BlurImage
          src={bannerImg}
          alt="banner-3"
          placeholder="blur"
          layout="fill"
          static
          sizes="700px"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export default Banner;
