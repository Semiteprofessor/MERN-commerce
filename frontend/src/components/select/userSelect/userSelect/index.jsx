import { Box, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const UserSelect = ({ isAdmin }) => {
  const { user, isAuthenticated } = useSelector(({ user }) => user);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPath = getKeyByValue(PATH_PAGE.auth, pathname);
  const isHomePath = pathname.slice(3) === "";
  const anchorRef = useRef(null);
  const [openUser, setOpenUser] = useState(false);

  const handleOpenUser = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      setOpenUser(true);
    }
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };

  return (
    <Box>
      {!isAuthenticated && !isAdmin ? (
        <Stack direction="row" gap={1}>
          <Typography
            href={`/auth/login${isAuthPath || isHomePath ? "" : `?redirect=${pathname}`}`}
            variant="body2"
            color="text.primary"
            component={Link}
            fontSize={14}
          >
            Login
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>Register</Typography>
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default UserSelect;
