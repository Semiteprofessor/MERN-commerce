import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { last } from "lodash";
// mui
import { Typography, Box, Link, Breadcrumbs } from "@mui/material";

function LinkItem({ link, admin }) {
  const { href, name, icon } = link;
  return (
    <Link
      component={NextLink}
      key={name}
      href={href}
      passHref
      variant={admin ? "body1" : "body2"}
      sx={{
        lineHeight: 2,
        display: "flex",
        alignItems: "center",
        color: admin ? "text.primary" : "common.white",
        "& > div": { display: "inherit" },
      }}
    >
      {icon && (
        <Box
          sx={{
            mr: 1,
            "& svg": {
              width: admin ? 30 : 20,
              height: admin ? 30 : 20,
              color: admin ? "text.primary" : "common.white",
            },
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </Link>
  );
}

LinkItem.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node,
  }).isRequired,
  admin: PropTypes.bool.isRequired,
};
