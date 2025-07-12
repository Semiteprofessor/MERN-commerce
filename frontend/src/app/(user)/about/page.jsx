import React from "react";

// mui
import { Container } from "@mui/material";

// component import
import AboutUs from "src/components/_main/about";

// Next.js dynamic import
import dynamic from "next/dynamic";

// skeleton component import
import HeaderBreadcrumbsSkeleton from "src/components/skeletons/breadcrumbs";

// Dynamically importing the HeaderBreadcrumbs component with a fallback to a skeleton loader while loading
const HeaderBreadcrumbs = dynamic(
  () => import("src/components/headerBreadcrumbs"),
  {
    loading: () => <HeaderBreadcrumbsSkeleton />,
  }
);

const page = () => {
  return <div>page</div>;
};

export default page;
