"use client";
// react
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

// mui
import { Box, Paper, Typography, Card, Stack } from "@mui/material";
// framer motion
import { motion, AnimatePresence } from "framer-motion";
// components
import Actions from "./actions";

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

const CarouselItem = ({ ...props }) => {
  const { item } = props;
  return <Paper>CarouselItem</Paper>;
};

export default CarouselItem;
