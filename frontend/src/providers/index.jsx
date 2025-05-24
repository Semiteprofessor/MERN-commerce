"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

import { persistor, reduxStore } from "@/redux/store";
import ThemeRegistry from "@/theme";
import { LinearProgress, Stack } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import AuthProvider from "./auth";

import GlobalStyles from "@/theme/globalStyles";

// dynamic import
const ProgressBar = dynamic(() => import("@/components/ProgressBar"), {
  ssr: false,
});

const Providers = (props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // default: true
          },
        },
      })
  );

  return (
    <Provider store={reduxStore}>
      <AuthProvider isAuth={props.isAuth}>
        <ThemeRegistry>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <Toaster position={"top-center"} />
            <PersistGate
              loading={
                <Stack
                  sx={{
                    position: "fixed",
                    top: "calc(50vh - 2px)",
                    width: "300px",
                    left: "calc(50vw - 150px",
                    zIndex: 11,
                  }}
                >
                  <LinearProgress />
                </Stack>
              }
              persistor={persistor}
            >
              {props.children}
            </PersistGate>
          </QueryClientProvider>
          <ProgressBar />
        </ThemeRegistry>
      </AuthProvider>
    </Provider>
  );
};

Providers.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Providers;
