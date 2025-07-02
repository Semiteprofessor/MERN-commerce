import ThemeRegistry from "@/theme";
import { LinearProgress, Stack } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";

import { reduxStore, persistor } from "src/redux";

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
    <ThemeRegistry>
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
    </ThemeRegistry>
  );
};

export default Providers;
