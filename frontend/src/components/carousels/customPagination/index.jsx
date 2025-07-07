// react
"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import BlurImage from "@/components/blurImage";
// mui
import { Box, Stack } from "@mui/material";
// framer motion
import { motion, AnimatePresence } from "framer-motion";
// styles
import RootStyled from "./styled";

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
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ProductDetailsCarousel = ({ ...props }) => {
  return <div>ProductDetailsCarousel</div>;
};

// ----------------------------------------------------------------------
ProductDetailsCarousel.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductDetailsCarousel;
