import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
// mui
import { Box, Tooltip, Typography, Button, Stack, Zoom } from "@mui/material";
// icons
import { FaCheck } from "react-icons/fa6";
import { MdFormatColorFill } from "react-icons/md";
// next
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
// data
import { capitalCase } from "change-case";

ColorsMain.propTypes = {
  filterColors: PropTypes.arrayOf(PropTypes.string),
  path: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

const ColorsMain = () => {
  return <div>ColorsMain</div>;
};

export default ColorsMain;
