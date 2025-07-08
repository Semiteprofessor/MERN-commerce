import PropTypes from "prop-types";
import React, { useState } from "react";

// mui
import { Box, Stack, IconButton, Skeleton } from "@mui/material";

// icons
import { FaCheck } from "react-icons/fa6";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const colorPreview = ({ ...props }) => {
  const { colors, color, setColor, isDetail, loading } = props;

  const [colorCount, setColorCount] = useState(0);

  return (
    <Stack direction="row" spacing={0.5}>
      {!isDetail && colors?.length > 6 && (
        <IconButton
          size="small"
          onClick={() => {
            if (colorCount > 0) {
              setColorCount(colorCount - 1);
            }
          }}
          sx={{
            width: 24,
            height: 24,
            p: 0.1,
            svg: {
              color: colorCount === 0 ? "text.disabled" : "text.primary",
            },
          }}
          disabled={colorCount === 0}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </IconButton>
      )}
    </Stack>
  );
};

export default colorPreview;
