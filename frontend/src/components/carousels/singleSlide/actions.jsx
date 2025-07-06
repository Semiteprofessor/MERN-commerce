import { Stack } from "@mui/material";
import React from "react";

const actions = ({ active, paginate, data, setPage }) => {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{
        p: 0.5,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
        backdropFilter: "blur(3px)",

        zIndex: 11,
        borderRadius: "27px",
        position: "absolute",
        left: "50%",
        bottom: "10px",
        transform: "translateX(-50%)",
        display: { md: "flex", xs: "none" },
      }}
    >
      actions
    </Stack>
  );
};

export default actions;
