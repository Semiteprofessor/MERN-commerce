"use client";
import React from "react";
import NextLink from "next/link";

// mui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Typography,
  Container,
  Stack,
  Box,
  IconButton,
  Grid,
  Link,
  Fab,
  Divider,
} from "@mui/material";

// components
import NewsLetter from "./newsletter";
import Logo from "@/components/logo";

// icons
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { MdOutlineCall } from "react-icons/md";

const SOCIAL_MEDIA_LINK = [
  {
    linkPath: "https://www.facebook.com/techgater",
    icon: <FaFacebookF size={18} />,
  },
  {
    linkPath: "https://www.instagram.com/techgater",
    icon: <FaInstagram size={18} />,
  },
  {
    linkPath: "https://www.linkedin.com/company/89683736/admin",
    icon: <FaLinkedinIn size={18} />,
  },
];
