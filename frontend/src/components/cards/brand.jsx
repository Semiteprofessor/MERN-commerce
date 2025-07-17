"use client";
import React from "react";
import { uniqueId } from "lodash";
import { capitalize } from "lodash";

// next
import Link from "next/link";
import PropTypes from "prop-types";
// mui
import { Card, Typography, Skeleton, CardContent, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
import BlurImage from "src/components/blurImage";

const UserBrandsCard = ({ item, isLoading }) => {
  const theme = useTheme();
  const baseUrl = "/brands/";
  return <div>UserBrandsCard</div>;
};

export default UserBrandsCard;
