import React from "react";

// mui
import { Container } from "@mui/material";

// component import
import AboutUs from "@/components/_main/about";

// Next.js dynamic import
import dynamic from "next/dynamic";

// skeleton component import
import HeaderBreadcrumbsSkeleton from "@/components/skeletons/breadcrumbs";

// Dynamically importing the HeaderBreadcrumbs component with a fallback to a skeleton loader while loading
const HeaderBreadcrumbs = dynamic(
  () => import("@/components/headerBreadcrumbs"),
  {
    loading: () => <HeaderBreadcrumbsSkeleton />,
  }
);

const page = () => {
  return (
    <>
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="About Us"
          links={[
            {
              name: "Home",
              href: "/",
            },
            {
              name: "About us",
            },
          ]}
        />
        <AboutUs />
      </Container>
    </>
  );
};

export default page;
