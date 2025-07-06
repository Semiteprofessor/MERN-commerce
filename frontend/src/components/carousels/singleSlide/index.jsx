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

// ----------------------------------------------------------------------
CarouselItem.propTypes = {
  item: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    btnPrimary: PropTypes.shape({
      url: PropTypes.string.isRequired,
      btnText: PropTypes.string.isRequired
    }).isRequired,
    btnSecondary: PropTypes.shape({
      url: PropTypes.string.isRequired,
      btnText: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

const CarouselItem = ({ ...props }) => {
  const { item } = props;
  return <Paper>CarouselItem</Paper>;
};

export default CarouselItem;
