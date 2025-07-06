"use client";
import React from "react";
import PropTypes from "prop-types";
import RouterLink from "next/link";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { FaAngleRight } from "react-icons/fa6";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  List,
  Card,
  ListItem,
  Typography,
  Stack,
  Button,
  Skeleton,
} from "@mui/material";
// api
import * as api from "@/services";
import { useQuery } from "react-query";
// redux
import { setShops } from "@/redux/slices/shops";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 40;
// ----------------------------------------------------------------------
function ParentItem({ shop, isLast, isLoading }) {
  const activeStyle = {
    color: "primary.main",
    bgcolor: (theme) =>
      alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
  };

  return (
    <ListItem
      href={`/shops/${shop?.slug}`}
      component={RouterLink}
      sx={{
        padding: (theme) => theme.spacing(3.5, 2),
        height: ITEM_HEIGHT,
        cursor: "pointer",
        color: "text.primary",
        typography: "subtitle2",
        textTransform: "capitalize",
        justifyContent: "space-between",
        transition: (theme) => theme.transitions.create("all"),
        borderBottom: (theme) =>
          `1px solid ${isLast ? "transparent" : theme.palette.divider}`,
        "&:hover": activeStyle,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component="span"
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
            border: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Image
              src={shop?.logo?.url}
              placeholder="blur"
              blurDataURL={shop?.logo?.blurDataURL}
              alt={shop?.title}
              layout="fill"
              objectFit="cover"
              size="30vw"
            />
          )}
        </Box>
        <Typography variant="body1" color="text.primary" fontWeight={500}>
          {isLoading ? <Skeleton variant="text" width={120} /> : shop?.title}
        </Typography>
      </Stack>
    </ListItem>
  );
}
  
const MegaMenu = ({ shop, isLast, isLoading }) => {
  return <ParentItem shop={shop} isLoading={isLoading} isLast={isLast} />;
}
  

export default MegaMenu;
