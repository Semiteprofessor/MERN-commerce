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
    const { item } = props;
  return (
    <div>
      <Card
        sx={{
          p: 2,
          width: "100%",
          maxWidth: 500,
          ml: "auto",
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Rating value={5} readOnly size="small" />
          <Typography variant="body1">{item.reviewdetail}</Typography>
          <Image
            priority
            component={Avatar}
            src={item.cover.url}
            placeholder="blur"
            alt="avatar"
            responsive
            static
            dragable={false}
            height={80}
            width={80}
            sizes="100px"
            style={{
              borderRadius: 50,
            }}
          />
          <Stack
            spacing={0.5}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Typography variant="subtitle1">{item.name}</Typography>
            <Typography variant="body1">{item.jobTitle}</Typography>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

export default TestimonialDetailsCarousel;
