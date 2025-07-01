"use client";

import { useTheme } from "@mui/material";
import { Container, Toolbar } from "@mui/material";
import NextLink from "next/link";
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
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Link
            component={NextLink}
            href={"tel:+13866883295"}
            sx={{
              color: "text.primary",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MdOutlinePhone /> +1 386-688-3295
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link
            component={NextLink}
            href={"mailto:johndoe@yahoo.com"}
            sx={{
              color: "text.primary",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MdOutlineMail /> johndoe@yahoo.com
          </Link>
        </Stack>
      </Toolbar>
    </Container>
  );
};

export default UserTopBar;
