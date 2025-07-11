"use client";
import React from "react";
// Next
import Image from "next/image";
// MUI
import {
  alpha,
  Box,
  Grid,
  Typography,
  Container,
  Stack,
  Fab,
} from "@mui/material";
// icons
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
// Image
import bgImage from "../../../../../public/images/testimonial.png";
import AvatarImg from "../../../../../public/images/avatar.png";
// Components
import TestimonialCarousel from "src/components/carousels/testimonial";
import { useSelector } from "react-redux";

// data
const data = [
    {
      cover: { url: AvatarImg },
      name: 'Alex Thompson',
      jobTitle: 'Software Engineer',
      reviewdetail:
        'Exceptional shopping experience! The user-friendly interface and seamless navigation make finding and purchasing products a breeze. As a Marketing Manager, I appreciate the...',
      reviews: 4
    },
    {
      cover: { url: AvatarImg },
      name: 'John Thompson',
      jobTitle: 'Web Developer Engineer',
      reviewdetail:
        'Exceptional shopping experience! The user-friendly interface and seamless navigation make finding and purchasing products a breeze. As a Marketing Manager, I appreciate the...',
      reviews: 5
    },
    {
      cover: { url: AvatarImg },
      name: 'John Doe',
      jobTitle: 'Software Engineer',
      reviewdetail:
        'Exceptional shopping experience! The user-friendly interface and seamless navigation make finding and purchasing products a breeze. As a Marketing Manager, I appreciate the...',
      reviews: 3
    }
  ];
  
const Testimonials = () => {
    const { themeMode } = useSelector(({ settings }) => settings);
    const [[page, direction], setPage] = React.useState([0, 0]);
    const imageIndex = Math.abs(page % data?.length);
    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };
    const isDarkMode = themeMode === "dark";
  return <div>Testimonials</div>;
};

export default Testimonials;
