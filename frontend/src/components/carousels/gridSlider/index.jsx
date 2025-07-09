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

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accommodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

// ----------------------------------------------------------------------
function CarouselItem({ ...props }) {
  const { index, isLoading } = props;

  return (
    <Paper
      className="slide-wrapper"
      elevation={0}
      sx={{
        position: 'relative',
        pb: { md: '38%', sm: '82%', xs: '142%' },
        zIndex: 11,
        bgcolor: 'transparent',
        borderRadius: 0
      }}
    >
      <ProductCard loading={isLoading} product={index} />
    </Paper>
  );
}
