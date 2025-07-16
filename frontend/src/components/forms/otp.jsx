"use client";
import React from "react";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
// api
import * as api from "@/services";
import { useMutation } from "react-query";
import { verifyUser } from "@/redux/slices/user";
// mui
import { Box, Card, Stack, Container, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";

// Renderer callback with condition
const renderer = ({ minutes, seconds }) => {
  return (
    <>
      <Stack
        direction="row"
        gap={0.5}
        sx={{
          bgcolor: "background.default",
          border: (theme) => "1px solid " + theme.palette.divider,
          p: 1,
          borderRadius: "4px",
          maxWidth: 100,
          mx: "auto",
          mt: 2,
          color: "text.primary",
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          gap={0}
          sx={{
            height: 28,
            width: 28,
            borderRadius: "2px",
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={800}
            fontSize={14}
            lineHeight={1}
          >
            {minutes}
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            fontSize={8}
            fontWeight={400}
            lineHeight={1}
          >
            MIN
          </Typography>
        </Stack>
        <Typography variant="body1" color="common.white">
          :
        </Typography>
        <Stack
          justifyContent="center"
          alignItems="center"
          gap={0}
          sx={{
            height: 28,
            width: 28,
            borderRadius: "2px",
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={800}
            fontSize={14}
            lineHeight={1}
          >
            {seconds}
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            fontSize={8}
            fontWeight={400}
            lineHeight={1}
          >
            SEC
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

const VerifyOTPForm = () => {
  return <div>VerifyOTPForm</div>;
};

export default VerifyOTPForm;
