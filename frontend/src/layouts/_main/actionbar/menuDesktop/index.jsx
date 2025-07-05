import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next-nprogress-bar";

// material
import typography from "@/theme/typography";
import { Link, Stack, Button, alpha, Box } from "@mui/material";

// icons
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";

// components
import MenuDesktopPopover from "@/components/popover/menuDesktop";

// api
import { useQuery } from "react-query";
import * as api from "@/services";

// ----------------------------------------------------------------------

MenuDesktopItem.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  isOffset: PropTypes.bool.isRequired,
  scrollPosition: PropTypes.any,
};
