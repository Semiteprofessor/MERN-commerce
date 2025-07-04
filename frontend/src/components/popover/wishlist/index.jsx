import { IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import { useSelector } from "react-redux";

const WishlistPopover = () => {
  const router = useRouter();

  const { wishlist } = useSelector(({ wishlist }) => wishlist);
  const { isAuthenticated } = useSelector(({ user }) => user);

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
      spacing={1}
    >
      <IconButton
        name="wishlist"
        color="primary"
        disableRipple
        sx={() => {
          if (!isAuthenticated) {
            router.push("/auth/login");
          } else {
            router.push("/profile/wishlist");
          }
        }}
      >
        <IoMdHeartEmpty />
      </IconButton>
      <Stack>
        <Typography variant="subtitle2" color="text.primary" mb={-0.6}>
          Wishlist
        </Typography>
        <Typography>
          {wishlist?.length || 0} {wishlist?.length > 1 ? "Items" : "Item"}
        </Typography>
      </Stack>
    </Stack>
  );
};

WishlistPopover.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default WishlistPopover;
