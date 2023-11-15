import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BookTwoToneIcon from "@mui/icons-material/BookTwoTone";
import { Grid, Stack, Typography } from "@mui/material";
import BackGroundAboutProject from "../assets/images/background/shape-bg-1.png";
import wawe from "../assets/images/wave.svg";
import Footer from "./Footer";
import SendUsMessage from "./SendUsMessage";
export default function AboutProject() {
  return (
    <>
      <SendUsMessage></SendUsMessage>
      <Grid
        mt={2}
        height={300}
        container
        sx={{
          backgroundImage: `url("${BackGroundAboutProject}")`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={2}
            direction={"column"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BookTwoToneIcon
              sx={{
                height: 100,
                width: 100,
                padding: 2,
                color: "#FFB800",
                backgroundColor: "#FFEED9",
                borderRadius: "50%",
              }}
            />
            <Typography variant="h1">48</Typography>
            <img src={wawe} width={35} alt="" />
            <Typography variant="h3">BLOG POSTS</Typography>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={2}
            direction={"column"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AccountCircleTwoToneIcon
              sx={{
                height: 100,
                width: 100,
                padding: 2,
                color: "#FFB800",
                backgroundColor: "#FFEED9",
                borderRadius: "50%",
              }}
            />
            <Typography variant="h1">100</Typography>
            <img src={wawe} width={35} alt="" />
            <Typography variant="h3">USERS</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
}
