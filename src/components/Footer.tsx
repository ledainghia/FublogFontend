import { Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Grid
        container
        p={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          xs={12}
          md={6}
        >
          <Typography variant="h5">Chals© 2023, All Rights Reserved</Typography>
        </Grid>
      </Grid>
    </>
  );
}
