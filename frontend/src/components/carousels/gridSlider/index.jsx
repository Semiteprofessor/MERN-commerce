// react
"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
// mui
import { Paper, useMediaQuery, Grid, Fab, Stack } from "@mui/material";
// icons
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
// framer motion
import { motion, AnimatePresence } from "framer-motion";
// components
import ProductCard from "@/components/cards/product";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
