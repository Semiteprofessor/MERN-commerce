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
        position: "relative",
        pb: { md: "38%", sm: "82%", xs: "142%" },
        zIndex: 11,
        bgcolor: "transparent",
        borderRadius: 0,
      }}
    >
      <ProductCard loading={isLoading} product={index} />
    </Paper>
  );
}

function isFloat(number) {
  return Number(number) === number && number % 1 !== 0;
}

ProductsCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const ProductsCarousel = ({ ...props }) => {
  const { data, isLoading } = props;

  const isLarge = useMediaQuery("(min-width:1200px)");
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isTablet = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const { themeMode } = useSelector(({ settings }) => settings);

  const [[page, direction], setPage] = useState([0, 0]);
  var slidesToShow = isLarge
    ? 4
    : isDesktop
      ? 3
      : isTablet
        ? 2
        : isMobile
          ? 2
          : 4;
  var total = data?.length / slidesToShow;
  var totalSlides =
    total === 0 ? 0 : isFloat(total) ? Math.floor(total) + 1 : total;

  const imageIndex = page;

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage <= totalSlides - 1) {
      setPage([nextPage, newDirection]);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: 0,
        width: "100%",
        marginLeft: 0,
        "& .slide-wrapper ": {
          paddingBottom: "60%",
        },
      }}
    >
      <Paper
        className="main-paper"
        elevation={0}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: { lg: "35%", md: "44%", sm: "73%", xs: "86%" },
          overflow: "hidden",
          width: { xs: "100%", sm: "calc(100% + 48px)" },
          // width: 'calc(100% + 48px)',
          ml: { xs: 0, md: "-24px" },
          "& .motion-dev": {
            pl: { md: `24px !important`, xs: `0px !important` },
            pr: { md: `24px !important`, xs: `0px !important` },
          },
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="motion-dev"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              top: 0,
            }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          ></motion.div>
        </AnimatePresence>
      </Paper>
    </Paper>
  );
};

export default ProductsCarousel;
