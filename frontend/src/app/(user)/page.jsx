import Hero from "@/components/_main/home/hero";
import { Container } from "@mui/material";
import React from "react";

const IndexPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Hero />
      </Container>
      <TopBanners />
    </>
  );
};

export default IndexPage;
