import { alpha, IconButton, Stack, Typography, Dialog } from "@mui/material";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Search from "./search";

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
        <Typography variant="body1" color="text.secondary" ml={2}>
          Search...
        </Typography>
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
        >
          <IoSearchOutline />
        </IconButton>
      </Stack>
      <Dialog open={open}>
        <Search onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default SimpleDialogDemo;
