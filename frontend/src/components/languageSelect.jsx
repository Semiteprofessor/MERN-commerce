import { Api } from "@mui/icons-material";
import {
  alpha,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdClear, MdCurrencyExchange } from "react-icons/md";
import { useQuery } from "react-query";

// api
import * as api from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeCurrency } from "@/redux/slices/settings";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { currency } = useSelector(({ settings }) => settings);
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery(["get-currencies"], () =>
    api.getCurrencies()
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="lang-curr-select"
        onClick={handleClickOpen}
        color="primary"
        sx={{
          borderColor: "primary",
          borderWidth: 1,
          borderStyle: "solid",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <MdCurrencyExchange />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 5, top: 5, zIndex: 111 }}
        >
          <MdClear />
        </IconButton>
        <DialogContent>
          <Typography variant="h5" mb={2}>
            Choose a currency
          </Typography>
          <Grid>
            {(isLoading ? Array.from(new Array(12)) : (data?.data ?? [])).map(
              (cur, idx) => (
                <Grid key={idx} item xs={12} md={4}>
                  <Button
                    onClick={() => {
                      if (!isLoading && cur) {
                        dispatch(
                          handleChangeCurrency({
                            currency: cur.code,
                            rate: cur.rate,
                          })
                        );
                      }
                      handleClose();
                    }}
                    fullWidth
                    size="large"
                  />
                </Grid>
              )
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default LanguageSelect;
