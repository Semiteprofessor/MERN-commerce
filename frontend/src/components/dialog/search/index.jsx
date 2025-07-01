import { Stack } from "@mui/material";
import React from "react";

const SimpleDialogDemo = () => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between" onClick={handleClickOpen}
      ></Stack>
    </>
  );
};

export default SimpleDialogDemo;
