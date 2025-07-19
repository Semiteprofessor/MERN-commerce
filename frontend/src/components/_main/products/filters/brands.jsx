import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import PropTypes from "prop-types";
// mui
import {
  FormGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  Button,
  Stack,
  Zoom,
} from "@mui/material";
// icons
import { MdOutlineBrandingWatermark } from "react-icons/md";

const BrandMain = ({ brands, path }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const { push } = router;

  const [selectedBrand, setSelectedBrand] = useState("");
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const deleteQueryString = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );
  const handleChange = (event) => {
    const slug = event.target.value;
    setSelectedBrand(slug);

    const queryString = createQueryString("brand", slug);
    push(`${path}?${queryString}`);
  };

  useEffect(() => {
    setSelectedBrand(brand || "");
  }, [brand]);

  return <div>BrandMain</div>;
};

export default BrandMain;
