"use client";

import Logo from "@/components/ui/logo";
import {
  alpha,
  AppBar,
  Box,
  Container,
  Skeleton,
  Stack,
  Toolbar,
} from "@mui/material";
import dynamic from "next/dynamic";

const Search = dynamic(() => import("@/components/dialog/search"), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rounded"
      width={300}
      height={56}
      sx={{ borderRadius: "70px" }}
    />
  ),
});

const LanguageSelect = dynamic(() => import("@/components/languageSelect"), {
  ssr: false,
  loading: () => <Skeleton variant="circular" width={40} height={40} />,
});

const SettingMode = dynamic(
  () => import("@/components/settings/themeModeSetting"),
  {
    loading: () => <Skeleton variant="circular" width={40} height={40} />,
  }
);

const WishlistProvider = dynamic(
  () => import("@/components/popover/wishlist"),
  {
    loading: () => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
          <Skeleton variant="text" width={60} sx={{ mb: 0.6 }} />
          <Skeleton variant="text" width={60} />
        </Box>
      </Stack>
    ),
  }
);

const Navbar = () => {
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        position: "sticky",
        top: -0.5,
        zIndex: 999,
        borderRadius: 0,
        pr: "0px !important",
        bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        display: { md: "block", xs: "none" },
        "& .toolbar": {
          justifyContent: "space-between",
          backdropFilter: "blur(6px)",
          borderRadius: 0,
          WebkitBackdropFilter: "blur(6px)", // Fix on mobile
          bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
          px: 3,
          py: 1.5,
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          className="toolbar"
          sx={{ px: "0px !important" }}
        >
          <Stack gap={4} direction="row" alignItems="center">
            <Logo />
            <Search />
          </Stack>

          <Stack gap={2} direction="row" alignItems="center">
            <LanguageSelect />
            <SettingMode />
            <WishlistProvider />
            {/* <CompareWidget />
            <CartWidget /> */}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
