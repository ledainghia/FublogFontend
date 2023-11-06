import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import background from "../assets/images/background/background-sendus.png";
export default function SendUsMessage() {
  return (
    <>
      <Grid
        mt={1}
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          backgroundImage: `url("${background}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        spacing={3}
        p={4}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h1">Send Us Message</Typography>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Your name"
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Your mail"
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item xs={12} mt={2}>
              <TextField
                fullWidth
                multiline
                maxRows={5}
                label="Your message"
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 3 }}>
            Submit now
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
