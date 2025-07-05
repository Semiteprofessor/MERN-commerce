import React, { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
// mui
import {
  Box,
  List,
  Stack,
  ListItem,
  Skeleton,
  Divider,
  Typography,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RootStyled from "./styled";

// api
import * as api from "src/services";
// redux
import { setWishlist } from "src/redux/slices/wishlist";
import { useDispatch } from "react-redux";

// Inside your functional component
Wishlist.propTypes = {
  item: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired,
};

const SkeletonComponent = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography variant="body2" color="text.primary">
                <Skeleton variant="text" />
              </Typography>

              <Stack direction="row" alignItems="center">
                <Skeleton variant="circular" height={14} width={14} />
                <Typography variant="body2" color="text.secondary">
                  <Skeleton variant="text" width={140} />
                </Typography>
              </Stack>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
  