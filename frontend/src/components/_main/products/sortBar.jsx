"use client";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { isString } from "lodash";

// mui
import { Stack, Drawer } from "@mui/material";
import { Typography, Skeleton, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// next
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
// icon
import { MdTune } from "react-icons/md";
// dynamic component
const Filter = dynamic(() => import("@/components/_main/products/filters"), {
  loading: () => <Skeleton variant="rounded" width={"100%"} height={185} />,
});

const SortBar = () => {
  return <div>SortBar</div>;
};

export default SortBar;
