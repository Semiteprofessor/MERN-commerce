import { Box } from '@mui/material'
import React from 'react'

const Banner = () => {
  return (
    <Box
      sx={{
        mt: 4,
        overflow: "hidden",
        position: "relative",
        display: { md: "block", xs: "none" },
      }}
    >
      Banner
    </Box>
  );
}

export default Banner