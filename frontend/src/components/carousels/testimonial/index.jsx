import { Box, Typography, Card, Stack, Rating, Avatar } from "@mui/material";
// icons
import { GoVerified } from "react-icons/go";
// framer motion
import { motion, AnimatePresence } from "framer-motion";

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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

// ----------------------------------------------------------------------
TestimonialDetailsCarousel.propTypes = {
  item: PropTypes.object.isRequired,
};

const TestimonialDetailsCarousel = () => {
  return <div>TestimonialDetailsCarousel</div>;
};

export default TestimonialDetailsCarousel;
