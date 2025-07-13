"use client";
import React from "react";
// material ui
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
// images
import AboutImage from "../../../../public/images/about-1.png";
import AboutImage2 from "../../../../public/images/about-2.png";
// components
import WhyUs from "../home/whyUs";
import Team from "./team";

const Data = [
  {
    name: "Vendors",
    range: "65k+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
  {
    name: "Earnings",
    range: "$45B+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
  {
    name: "Sold",
    range: "25M+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
  {
    name: "Products",
    range: "70k+",
    description: "Contrary to popular belief, Lorem is not simply random text.",
  },
];
const Index = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ my: 8 }}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Stack direction="row" spacing={3} mt={5}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 418,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={AboutImage}
                  alt=""
                  fill
                  placeholder="blur"
                  objectFit="cover"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 418,
                  borderRadius: 4,
                  overflow: "hidden",
                  transform: "translateY(-40px)",
                }}
              >
                <Image
                  src={AboutImage2}
                  alt=""
                  fill
                  placeholder="blur"
                  objectFit="cover"
                />
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              fontSize="16px"
              textTransform="uppercase"
              color="primary"
            >
              Who We Are?
            </Typography>
            <Typography variant="h2" fontWeight={800}>
              Creating a World Where Fashion is a Lifestyle
            </Typography>
            <Typography
              variant="body1"
              fontWeight={400}
              color="text.secondary"
              mt={2}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. Lorem
              Ipsum has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. Lorem
              Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Index;
