"use client";
import PropTypes from "prop-types";
import Link from "next/link";
// mui
import {
  Typography,
  CardActionArea,
  Card,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";
// components
import Image from "src/components/blurImage";

const CategoriesCard = ({ ...props }) => {
  const { category, isLoading } = props;
  const baseUrl = "/products/";

  return <div>CategoriesCard</div>;
};

export default CategoriesCard;
