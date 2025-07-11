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

const Subscription = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("subscriptionDismissedAt", Date.now().toString());
  };
  // useEffect to open the dialog when the component mounts
  React.useEffect(() => {
    const dismissedAt = localStorage.getItem("subscriptionDismissedAt");
    if (dismissedAt) {
      const timeSinceDismissed = Date.now() - parseInt(dismissedAt, 10);
      if (timeSinceDismissed < ONE_DAY_IN_MS) {
        return;
      }
    }

    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000); //

    return () => clearTimeout(timer);
  }, []);

  //   api integrate
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      if (
        values.email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setLoading(true);
        mutate(values);
      } else {
        toast.error("Invalid email!");
      }
    },
  });

  const { mutate } = useMutation(api.sendNewsletter, {
    onSuccess: (data) => {
      toast.success(data.message);
      setLoading(false);
      formik.resetForm();
      handleClose();
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    },
  });

  const { handleSubmit, getFieldProps } = formik;

  return <div>Subscription</div>;
};

export default Subscription;
