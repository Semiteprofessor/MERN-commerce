import React, { useState } from "react";
import PropTypes from "prop-types";

// mui
import { Stack, Button, Zoom, Skeleton } from "@mui/material";

// icons
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

SizePreview.propTypes = {
  sizes: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  setSize: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const SizePreview = ({ sizes, size, setSize, isDetail, loading }) => {
  return <div>SizePreview</div>;
};

export default SizePreview;
