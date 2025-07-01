"use client";

import {
  Container,
  Toolbar,
  Divider,
  Link,
  Skeleton,
  Stack,
  useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import React from "react";
import { useSelector } from "react-redux";

// icons
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

const UserSelect = dynamic(() => import("@/components/select/userSelect"), {
  ssr: false,
  loading: () => (
    <Stack>
      <Skeleton
        variant="rectangular"
        width={29.4}
        height={18.9}
        sx={{ borderRadius: "4px" }}
      />
      <Divider orientation="vertical" flexItem />
      <Skeleton
        variant="rectangular"
        width={29.4}
        height={18.9}
        sx={{ borderRadius: "4px" }}
      />
    </Stack>
  ),
});

const UserTopBar = () => {
  const theme = useTheme();
  //   const { user, isAuthenticated } = useSelector(({ user }) => user);
  const user = {
    firstName: "Taiwo",
    lastName: "Olapade",
    role: "user",
  };

  const isAuthenticated = true;

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
        <Stack direction="row" alignItems="center" spacing={1}>
          <UserSelect />
          {isAuthenticated ? (
            user.role === "user" && (
              <>
                <Divider orientation="vertical" flexItem />
                <Link
                  component={NextLink}
                  href={
                    isAuthenticated
                      ? "/create-shop"
                      : "/auth/register?redirect=/create-shop"
                  }
                  sx={{ color: "text.primary", fontSize: 14 }}
                >
                  Become a seller
                </Link>
              </>
            )
          ) : (
            <>
              <Divider orientation="vertical" flexItem />
              <Link
                component={NextLink}
                href={
                  isAuthenticated
                    ? "/create-shop"
                    : "/auth/register?redirect=/create-shop"
                }
                sx={{ color: "text.primary", fontSize: 14 }}
              >
                Become a seller
              </Link>
            </>
          )}
        </Stack>
      </Toolbar>
    </Container>
  );
};

export default UserTopBar;
