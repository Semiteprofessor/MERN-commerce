"use client";
// react
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

// mui
import { useMediaQuery } from "@mui/material";

// api
import * as api from "@/services";
import { useQuery } from "react-query";
// components
import ProductList from "./productList";
import SortBar from "./sortbar";
ProductListing.propTypes = {
  category: PropTypes.object,
  subCategory: PropTypes.object,
  shop: PropTypes.object,
};
// dynamic components
const Pagination = dynamic(() => import("@/components/pagination"));

const ProductListing = ({ category, subCategory, shop, compaign }) => {
  return <div>ProductListing</div>;
};

export default ProductListing;
