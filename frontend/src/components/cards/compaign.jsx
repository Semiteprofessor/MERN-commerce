"use client";
import Link from "next/link";
// mui
import {
  Typography,
  Card,
  Box,
  Stack,
  CardContent,
  alpha,
  Skeleton,
} from "@mui/material";
// components
import Image from "@/components/blurImage";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds }) => {
  // Render a countdown
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        ".main-card": {
          height: 70,
          width: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          borderRadius: 2,
        },
      }}
    >
      <Box className="main-card">
        <Stack alignItems="center">
          <Typography variant="h6">{days}</Typography>
          <Typography variant="body2" color="text.secondary">
            Days
          </Typography>
        </Stack>
      </Box>
      <Box className="main-card">
        <Stack alignItems="center">
          <Typography variant="h6">{hours}</Typography>
          <Typography variant="body2" color="text.secondary">
            Hours
          </Typography>
        </Stack>
      </Box>
      <Box className="main-card">
        <Stack alignItems="center">
          <Typography variant="h6">{minutes}</Typography>
          <Typography variant="body2" color="text.secondary">
            Minutes
          </Typography>
        </Stack>
      </Box>
      <Box className="main-card">
        <Stack alignItems="center">
          <Typography variant="h6">{seconds}</Typography>
          <Typography variant="body2" color="text.secondary">
            Seconds
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};
