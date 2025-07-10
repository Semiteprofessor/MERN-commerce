"use client";
import React from "react";
import Link from "next/link";
// mui
import { Box, Typography, Grid, Button, Container, Stack } from "@mui/material";
// icons
import { IoIosArrowForward } from "react-icons/io";

// blur image
import bannerImg from "../../../../../public/images/banner-3.png";
// components
import BlurImage from "@/components/blurImage";

const Banner = () => {
  return (
    <Box
      sx={{
        mt: 4,
        overflow: "hidden",
        position: "relative",
        display: { md: "block", xs: "none" },
      }}
    >
      <Box
        sx={{
          mt: 3,
          py: 12,
          position: "relative",
        }}
      >
        <BlurImage
          src={bannerImg}
          alt="banner-3"
          placeholder="blur"
          layout="fill"
          static
          sizes="700px"
          objectFit="cover"
        />
        <Container>
          <Grid>
            <Grid>
              <Stack>
                <Typography sx={{ zIndex: 11 }} variant="h2" fontWeight={900}>
                  UK Premier Store for Wrist Watches
                </Typography><Typography sx={{ zIndex: 11 }} variant="body1" color="text.success">
                  Welcome to our world of horological excellence, where timepieces become timeless statements of
                  elegance. Our collection showcases an unparalleled selection of premium watches, curated from renowned
                  luxury brands around the globe.
                </Typography>
                <Box>
                  <Button
                    component={Link}
                    href="/products"
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<IoIosArrowForward />}
                    sx={{
                      borderRadius: 6
                    }}
                  >
                    View more
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Banner;
