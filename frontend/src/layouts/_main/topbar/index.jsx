import { useTheme } from "@mui/material";
import { Container, Toolbar } from "@mui/material";
import React from "react";

const UserTopBar = () => {
  const theme = useTheme();

  return (
    <Container>
      <Toolbar
        sx={{
          minHeight: `36px !important`,
          background: theme.palette.background.default,
          justifyContent: "space-between",
          display: { xs: "none", md: "flex" },
          position: "static",
          width: "100%",
          zIndex: 999,
          px: "0px !important",
        }}
      ></Toolbar>
    </Container>
  );
};

export default UserTopBar;
