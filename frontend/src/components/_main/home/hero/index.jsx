import { Stack } from "@mui/material";
import React, { Suspense } from "react";
import { data } from "./data";

// components
import SingleSlideCarousel from "src/components/carousels/singleSlide";
import MegaMenu from "@/components/mega-menu/MegaMenu";

const Hero = () => {
  return (
    <Stack direction="row" gap={2} mt={2}>
      <Suspense>
        <MegaMenu />
      </Suspense>
      <SingleSlideCarousel data={data} />
    </Stack>
  );
};

export default Hero;
