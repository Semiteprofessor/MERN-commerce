"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// mui
import {
  Typography,
  Card,
  Box,
  Skeleton,
  Stack,
  Button,
  CardContent,
  Divider,
} from "@mui/material";
// components
import Image from "@/components/blurImage";
import { updateFollowShop } from "src/redux/slices/user";
// icons
import { AiOutlineShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
// api
import * as api from "@/services";

const ShopCard = ({ ...props }) => {
  const { shop, isLoading } = props;
  const { followingShops } = useSelector(({ user }) => user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const baseUrl = "/shops/";
  const { mutate } = useMutation(api.followShop, {
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(updateFollowShop(data.shopId));
      setLoading(false);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
      setLoading(false);
    },
  });

  return (
    <Card
      sx={{
        // px: 3,
        // py: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: 100,
        }}
      >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              height: 100,
              width: "100%",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              alt="shop"
              src={shop?.cover?.url}
              placeholder="blur"
              blurDataURL={shop?.cover?.blurDataURL}
              layout="fill"
              objectFit="cover"
              static
              draggable="false"
              quality={5}
              sizes={"200px"}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: 100,
        }}
      >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              height: 100,
              width: "100%",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              alt="shop"
              src={shop?.cover?.url}
              placeholder="blur"
              blurDataURL={shop?.cover?.blurDataURL}
              layout="fill"
              objectFit="cover"
              static
              draggable="false"
              quality={5}
              sizes={"200px"}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ShopCard;
