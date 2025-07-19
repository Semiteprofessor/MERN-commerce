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

const SortBar = ({
  compaign,
  productData,
  shop,
  isLoading,
  sortData,
  category,
  subCategory,
}) => {
  // filterData
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [itemsPerPage, setItemsPerPage] = useState("12");
  const top = searchParams.get("top");
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const price = searchParams.get("price");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  const [state, setState] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const createQueryString = useCallback(
    (name, value, key) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      if (name !== key) {
        params.delete(key);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (event) => {
    const filtered = sortData.find((item) => item.title === event.target.value);

    if (state) {
      const sortedData = sortData.find((item) => item.title === state);
      const key = sortedData?.key;

      router.push(
        `${pathname}?${createQueryString([filtered.key], filtered.value, key)}`,
        "isPathname"
      );
      setState(filtered.title);
    } else {
      router.push(
        `${pathname}?${createQueryString([filtered.key], filtered.value)}`,
        "isPathname"
      );
      setState(filtered.title);
    }
  };
  useEffect(() => {
    setItemsPerPage(isString(limit) ? limit : "12");
    setState(
      top === "-1"
        ? "Top Rated"
        : name === "1"
          ? "Asceding"
          : name === "-1"
            ? "Desceding"
            : date === "1"
              ? "Oldest"
              : date === "-1"
                ? "Newest"
                : price === "1"
                  ? "Price low to high"
                  : price === "-1"
                    ? "Price high to low"
                    : "Top Rated"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name || date || price || limit || top]);
  return <div>SortBar</div>;
};

export default SortBar;
