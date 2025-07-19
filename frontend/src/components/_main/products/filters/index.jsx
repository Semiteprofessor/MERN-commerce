"use client";
import React from "react";
import PropTypes from "prop-types";

// mui
import { Card, Box, Typography, IconButton, Divider } from "@mui/material";
// icons
import { MdClear } from "react-icons/md";

// components
import BrandsFilter from "./brands";
import GenderFilter from "./gender";
import ColorsFilter from "./colors";
import SizesFilter from "./sizes";
import PriceRange from "./price";
import Brands from "@/components/_main/skeletons/products/filters/brands";
import Gender from "@/components/_main/skeletons/products/filters/gander";
import Color from "@/components/_main/skeletons/products/filters/colors";
import Sizes from "@/components/_main/skeletons/products/filters/sizes";
// api
import * as api from "@/services";
import { useQuery } from "react-query";

Filter.propTypes = {
  onClose: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  shop: PropTypes.object,
  category: PropTypes.object,
  subCategory: PropTypes.object,
};

const Filter = ({ ...props }) => {
  return <div>Filter</div>;
};

export default Filter;
