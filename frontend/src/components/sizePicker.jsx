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
    const [sizeCount, setSizeCount] = useState(0);
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{
        button: {
          mr: 0.5,
        },
      }}
    >
      {!isDetail && sizes?.length > 6 && (
        <Zoom in={sizeCount > 0}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              if (sizeCount > 0) {
                setSizeCount(sizeCount - 1);
              }
            }}
            sx={{
              minHeight: 24,
              minWidth: 25,
              height: "24px !important",
              p: 0.2,
              color: "text.primary !important",
              display: sizeCount === 0 && "none",
              borderWidth: 0,
            }}
            disabled={sizeCount === 0}
          >
            <MdKeyboardDoubleArrowLeft size={20} />
          </Button>
        </Zoom>
      )}
    </Stack>
  );
};

export default SizePreview;
