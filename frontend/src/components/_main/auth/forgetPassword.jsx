"use client";
import React, { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-hot-toast";

// mui
import { Box, Button, Container, Typography, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// api
import * as api from "@/services";
import { useMutation } from "react-query";
// icons
import { CiCircleCheck } from "react-icons/ci";
// components
import ForgetPasswordForm from "@/components/forms/forgetPassword";

const ForgetPasswordMain = () => {
  return <div>ForgetPasswordMain</div>;
};

export default ForgetPasswordMain;
