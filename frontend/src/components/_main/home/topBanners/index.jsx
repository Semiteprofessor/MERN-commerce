"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// mui
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Button,
  Container,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// images
import banner1Img from "../../../../../public/images/banner-1.png";
import banner2Img from "../../../../../public/images/banner-2.png";

const Index = () => {
  const theme = useTheme();
  const isDeskTop = useMediaQuery(theme.breakpoints.up("xl"));
  const isDeskTopBtn = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box mb={2} mt={2}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12} sm={6}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "12px",
                height: "100%",
                px: { lg: 3, md: 1 },
                position: "relative",
              }}
            >
              <Image
                draggable="false"
                src={banner1Img}
                alt="banner-1"
                placeholder="blur"
                layout="fill"
                static
                sizes="100vw"
                objectFit="cover"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
