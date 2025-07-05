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

const ADDRESS = [
  {
    name: "Ohio St. South Gate, CA 90280",
    icon: <MdOutlineLocationOn />,
  },
  {
    name: "johndoe@yahoo.com",
    linkPath: "/",
    icon: <FiMail fontSize={20} />,
  },
  {
    name: "+1 386-688-3295",
    linkPath: "/",
    icon: <MdOutlineCall />,
  },
];

const MAIN_LINKS = [
  {
    heading: "Resources",
    listText1: "Contact us",
    listLink1: "/contact",
    listText2: "Products",
    listLink2: "/products",
    listText3: "Shops",
    listLink3: "/shops",
    listText4: "Compaigns",
    listLink4: "/compaigns",
  },
  {
    heading: "About us",
    listText1: "About us",
    listLink1: "/about",
    listText2: "Privacy policy",
    listLink2: "/privacy-policy",
    listText3: "Term and conditions",
    listLink3: "/terms-and-conditions",
    listText4: "Refund return policy",
    listLink4: "/refund-return-policy",
  },
];
  