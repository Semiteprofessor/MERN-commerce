"use client";
import * as React from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

// mui
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Grid,
  Typography,
  Box,
  Stack,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// images and Icons
import { MdClear } from "react-icons/md";
import subscriptionImg from "../../../../../public/images/subscription-img.png";
// formik
import { Form, FormikProvider, useFormik } from "formik";
// api
import * as api from "src/services";
import { useMutation } from "react-query";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const index = () => {
  return <div>index</div>;
};

export default index;
