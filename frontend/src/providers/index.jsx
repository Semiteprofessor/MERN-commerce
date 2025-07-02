import { LinearProgress, Stack } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";

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
      >
        {props.children}
      </PersistGate>
    </QueryClientProvider>
  );
};

export default Providers;
