"use client";

import { Divider, Stack, useTheme } from "@mui/material";
import { Container, Toolbar } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";

// icons
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

const UserSelect = dynamic(() => import('@/components/select'))

const UserTopBar = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
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
            href={"tel:+2348069095729"}
            sx={{
              color: "text.primary",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MdOutlinePhone /> +234 806-909-5729
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link
            component={NextLink}
            href={"mailto:semiteprofessor@gmail.com"}
            sx={{
              color: "text.primary",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MdOutlineMail /> semiteprofessor@gmail.com
          </Link>
        </Stack>
        <Stack>
          <UserSelect />
        </Stack>
      </Toolbar>
    </Container>
  );
};

export default UserTopBar;
