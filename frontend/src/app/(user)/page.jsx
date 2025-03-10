import { Container } from "@mui/material";
import React from "react";

// components
import Hero from "src/components/_main/home/hero"; // Importing the Hero component.
import WhyUs from 'src/components/_main/home/whyUs'; // Importing the WhyUs component.
import TopBanners from "src/components/_main/home/topBanners"; // Importing the TopBanners component.

const IndexPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Hero />
      </Container>
      <TopBanners />
      <Container maxWidth="xl">
        <WhyUs />
        {/* <Categories />
        <BestSellingProducs />
        <Compaigns /> */}
      </Container>
    </>
  );
};

export default IndexPage;
