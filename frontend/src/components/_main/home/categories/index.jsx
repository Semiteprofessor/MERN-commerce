"use client";
// react
import React from "react";
import NextLink from "next/link";
// mui
import { Typography, Grid, Box, Stack, Paper, Button } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
// component
import CategoryCard from "@/components/cards/category";
// api
import * as api from "@/services";
import { useQuery } from "react-query";

const Categories = () => {
  return (
    <Paper elevation={0}>
      <Stack
        direction={"column"}
        sx={{
          gap: 3,
          mt: 5,
        }}
      ></Stack>
    </Paper>
  );
};

export default Categories;
