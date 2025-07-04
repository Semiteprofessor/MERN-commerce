import { Stack } from "@mui/material";
import React from "react";

const WishlistPopover = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      width="auto"
      sx={{ cursor: "pointer" }}
      onClick={() => {
        if (!isAuthenticated) {
          router.push("/auth/login");
        } else {
          router.push("/profile/wishlist");
        }
      }}
    >
      WishlistPopover
    </Stack>
  );
};

export default WishlistPopover;
