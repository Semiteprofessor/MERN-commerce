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
 * Should accommodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const CarouselItem = ({ ...props }) => {
  const { item } = props;
  return (
    <Paper
      sx={{
        position: "relative",
        borderBottom: (theme) => "1px solid " + theme.palette.divider,
        zIndex: 11,
        height: { xs: 125, sm: 225, md: 270, lg: 370 },
        borderRadius: 0,
        img: {
          borderRadius: 0,
          objectPosition: { md: "center", xs: "left" },
        },
      }}
    >
      <Image
        priority
        src={item.cover}
        alt="centered-banner"
        layout="fill"
        placeholder="blur"
        objectFit="cover"
        static
        draggable="false"
        sizes="700px"
      />
      <Box
        sx={{
          top: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
    </Paper>
  );
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
      btnText: PropTypes.string.isRequired,
    }).isRequired,
    btnSecondary: PropTypes.shape({
      url: PropTypes.string.isRequired,
      btnText: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const SingleSlideCarousel = () => {
  const { data } = props;
  const { themeMode } = useSelector(({ settings }) => settings);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % data?.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  useEffect(() => {
    setTimeout(() => {
      setPage([page + 1, 1]);
    }, 12000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isEmpty = !Boolean(data?.length);

}

export default SingleSlideCarousel;
