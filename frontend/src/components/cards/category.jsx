"use client";
import PropTypes from "prop-types";
import Link from "next/link";
// mui
import {
  Typography,
  CardActionArea,
  Card,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";
// components
import Image from "@/components/blurImage";

const CategoriesCard = ({ ...props }) => {
  const { category, isLoading } = props;
  const baseUrl = "/products/";

  return (
    <Stack spacing={1} alignItems="center">
      <Card
        sx={{
          borderRadius: "50%",
          borderWidth: "3px !important",
          transform: "scale(1.0)",
          transition: "all 0.2s ease-in-out",
          width: { xs: 90, md: 175 },
          height: { xs: 90, md: 175 },
          border: isLoading && "none !important",
          "&:hover": {
            color: "#000",
            borderColor: (theme) => theme.palette.primary.main + "!important",
            transform: "scale(1.05)",
          },
          "& .image-wrapper": {
            position: "relative",
            width: "100%",
            img: {
              borderRadius: "50%",
            },
            "&:after": {
              content: `""`,
              display: "block",
              paddingBottom: "100%",
            },
          },
        }}
      ></Card>
    </Stack>
  );
};

export default CategoriesCard;
