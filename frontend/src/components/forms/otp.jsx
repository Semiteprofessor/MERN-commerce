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

const VerifyOTPForm = () => {
  return <div>VerifyOTPForm</div>;
};

export default VerifyOTPForm;
