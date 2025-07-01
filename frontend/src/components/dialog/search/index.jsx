import { alpha, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const SimpleDialogDemo = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleClickOpen}
        sx={{
          p: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 10,
          width: 300,
          height: 56,
          cursor: "pointer",
        }}
      >
        <Typography>Search...</Typography>
        <IconButton
          onClick={handleClickOpen}
          name="search"
          color="primary"
          sx={{
            borderColor: "primary",
            borderWidth: 1,
            borderStyle: "solid",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          }}
        />
      </Stack>
    </>
  );
};

export default SimpleDialogDemo;
