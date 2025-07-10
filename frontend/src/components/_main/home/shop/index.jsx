"use client";
// react
import React from "react";
import NextLink from "next/link";
import { useSelector } from "react-redux";

// mui
import { Typography, Grid, Box, Stack, Paper, Button } from "@mui/material";
// icons
import { IoIosArrowForward } from "react-icons/io";
// component
import ShopCard from "src/components/cards/shop";

const ShopComponent = () => {
  const { shops = [], isLoading } = useSelector(({ shops }) => shops);

  return (
    <Paper elevation={0}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        mb={3}
      >
        <Box width="100%">
          <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
            Best Shops
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={{ xs: 3, md: 5 }}
          >
            Our Highest Rated Shops Where You Can Find What You Are Looking For
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 6,
            display: { xs: "none", md: "flex" },
            minWidth: 130,
            px: 1,
          }}
          endIcon={<IoIosArrowForward />}
          component={NextLink}
          href={`/shops`}
        >
          View More
        </Button>
      </Stack>
    </Paper>
  );
};

export default ShopComponent;
