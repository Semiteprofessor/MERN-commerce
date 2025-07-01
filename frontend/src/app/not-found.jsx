"use client";

import { NotFoundIllustration } from "@/illustrations";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="text.primary">
        <NotFoundIllustration />
      </Typography>
      <Typography variant="body1" color="inherit">
        Something went wrong. It looks like the link is broken or the page was
        removed.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push("/")}
          size="large"
        >
          Go To Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
