import { Container } from "@mui/material";
import React from "react";

// Dynamic imports
const Categories = dynamic(() => import("@/components/_main/home/categories"));
// const BestSellingProducs = dynamic(
//   () => import("@/components/_main/home/bestSelling")
// );
// const Banner = dynamic(() => import("@/components/_main/home/banner"));
// const Brands = dynamic(() => import("@/components/_main/home/brands"));
// const TopCollection = dynamic(() => import("@/components/_main/home/top"));
// const Shops = dynamic(() => import("@/components/_main/home/shop"));
// const Compaigns = dynamic(() => import("@/components/_main/home/compaign"));
// const Testimonials = dynamic(
//   () => import("@/components/_main/home/testimonials")
// );
// const FeaturedProducts = dynamic(
//   () => import("@/components/_main/home/featured")
// );
// const SubscriptionModal = dynamic(
//   () => import("@/components/_main/home/subscription"),
//   {
//     ssr: false,
//   }
// );

// components
import Hero from "@/components/_main/home/hero"; // Importing the Hero component.
import WhyUs from "@/components/_main/home/whyUs"; // Importing the WhyUs component.
import TopBanners from "@/components/_main/home/topBanners"; // Importing the TopBanners component.
import dynamic from "next/dynamic";

const IndexPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Hero />
      </Container>
      <TopBanners />
      <Container maxWidth="xl">
        <WhyUs />
        <Categories />
        {/* <BestSellingProducs />
        <Compaigns /> */}
      </Container>
    </>
  );
};

export default IndexPage;
