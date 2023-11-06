import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import top1 from "../assets/images/ranking/diamond rank@2x.png";
import top2 from "../assets/images/ranking/gold rank@2x.png";
import top3 from "../assets/images/ranking/silver rank@2x.png";
import backgroundLeaderBoard from "../assets/images/background/backgroundLeaderboard.png";
const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
      background: ${theme.colors.alpha.white[100]};
  
      .MuiInputBase-input {
          font-size: ${theme.typography.pxToRem(17)};
      }
  `
);

export default function RankingContentCreator() {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Card sx={{ width: "100%" }}>
              <CardHeader
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(254,182,117,1) 0%, rgba(255,187,121,1) 100%)",
                  color: "white",
                }}
                title={
                  <>
                    <Typography variant="h2">
                      Rankings of Content Creator
                    </Typography>
                  </>
                }
                subheader={
                  <>
                    <Typography mt={3} variant="h6" color={"white"}>
                      Are you a content creator who thrives on innovation,
                      creativity, and the art of storytelling? Have you spent
                      countless hours crafting compelling narratives, capturing
                      breathtaking visuals, or engaging your audience with
                      thought-provoking content? If so, it's time to shine and
                      be recognized for your exceptional contributions to the
                      digital world!
                    </Typography>
                  </>
                }
              ></CardHeader>

              <CardContent
                sx={{ backgroundImage: `url("${backgroundLeaderBoard}")` }}
              >
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      spacing={20}
                      direction={"row"}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        spacing={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            height: 120,
                            width: 120,
                            border: "5px solid #ffb877",
                          }}
                          src="https://cdn.dribbble.com/userupload/10559280/file/original-5fe11ed54f79dc728284b2a4be1fa9df.png?resize=1024x768&vertical=center"
                        />
                        <Typography variant="h4"> TOP 2</Typography>
                        <Typography variant="h2"> Le Dai Nghia</Typography>
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="60px"
                          height="60px"
                          viewBox="0 0 24.00 24.00"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke="#CCCCCC"
                            stroke-width="0.288"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M21.8382 11.1263C22.0182 9.2137 22.1082 8.25739 21.781 7.86207C21.604 7.64823 21.3633 7.5172 21.106 7.4946C20.6303 7.45282 20.0329 8.1329 18.8381 9.49307C18.2202 10.1965 17.9113 10.5482 17.5666 10.6027C17.3757 10.6328 17.1811 10.6018 17.0047 10.5131C16.6865 10.3529 16.4743 9.91812 16.0499 9.04851L13.8131 4.46485C13.0112 2.82162 12.6102 2 12 2C11.3898 2 10.9888 2.82162 10.1869 4.46486L7.95007 9.04852C7.5257 9.91812 7.31351 10.3529 6.99526 10.5131C6.81892 10.6018 6.62434 10.6328 6.43337 10.6027C6.08872 10.5482 5.77977 10.1965 5.16187 9.49307C3.96708 8.1329 3.36968 7.45282 2.89399 7.4946C2.63666 7.5172 2.39598 7.64823 2.21899 7.86207C1.8918 8.25739 1.9818 9.2137 2.16181 11.1263L2.391 13.5616C2.76865 17.5742 2.95748 19.5805 4.14009 20.7902C5.32271 22 7.09517 22 10.6401 22H13.3599C16.9048 22 18.6773 22 19.8599 20.7902C20.7738 19.8553 21.0942 18.4447 21.367 16"
                              stroke="#ffb877"
                              stroke-width="1.512"
                              stroke-linecap="round"
                            ></path>{" "}
                            <path
                              d="M9 18H15"
                              stroke="#ffb877"
                              stroke-width="1.512"
                              stroke-linecap="round"
                            ></path>{" "}
                          </g>
                        </svg>
                        <Avatar
                          sx={{
                            height: 150,
                            width: 150,
                            border: "5px solid #ffb877",
                          }}
                          src="https://cdn.dribbble.com/userupload/10559280/file/original-5fe11ed54f79dc728284b2a4be1fa9df.png?resize=1024x768&vertical=center"
                        />
                        <Typography variant="h4"> TOP 1</Typography>
                        <Typography variant="h2"> Le Dai Nghia</Typography>
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            height: 120,
                            width: 120,
                            border: "5px solid #ffb877",
                          }}
                          src="https://cdn.dribbble.com/userupload/10559280/file/original-5fe11ed54f79dc728284b2a4be1fa9df.png?resize=1024x768&vertical=center"
                        />
                        <Typography variant="h4"> TOP 3</Typography>
                        <Typography variant="h2"> Le Dai Nghia</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={12} lg={12}>
                    <SearchInputWrapper
                      fullWidth
                      placeholder="Search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider></Divider>
              <CardContent>
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    md={1}
                    lg={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src="https://cdn.dribbble.com/userupload/10559280/file/original-5fe11ed54f79dc728284b2a4be1fa9df.png?resize=1024x768&vertical=center"></Avatar>
                  </Grid>
                  <Grid item xs={10} md={10} lg={10}>
                    <Stack direction={"row"} spacing={10}>
                      <Stack>
                        <Typography variant="h4"> John Doe</Typography>
                        <Typography variant="caption">
                          Content Creator
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Blog Posts</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Votes</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Views</Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid
                    item
                    xs={1}
                    md={1}
                    lg={1}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography variant="h3">4</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider></Divider>
              <CardContent>
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    md={1}
                    lg={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src="https://cdn.dribbble.com/userupload/10559280/file/original-5fe11ed54f79dc728284b2a4be1fa9df.png?resize=1024x768&vertical=center"></Avatar>
                  </Grid>
                  <Grid item xs={10} md={10} lg={10}>
                    <Stack direction={"row"} spacing={10}>
                      <Stack>
                        <Typography variant="h4"> John Doe</Typography>
                        <Typography variant="caption">
                          Content Creator
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Blog Posts</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Votes</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Views</Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid
                    item
                    xs={1}
                    md={1}
                    lg={1}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography variant="h4">4</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider></Divider>
              <CardContent>
                <Grid
                  container
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    md={1}
                    lg={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src="https://cdn.dribbble.com/userupload/10559280/file/original-5fe11ed54f79dc728284b2a4be1fa9df.png?resize=1024x768&vertical=center"></Avatar>
                  </Grid>
                  <Grid item xs={10} md={10} lg={10}>
                    <Stack direction={"row"} spacing={10}>
                      <Stack>
                        <Typography variant="h4"> John Doe</Typography>
                        <Typography variant="caption">
                          Content Creator
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Blog Posts</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Votes</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack>
                        <Typography variant="h4">102K</Typography>
                        <Typography variant="caption">Views</Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid
                    item
                    xs={1}
                    md={1}
                    lg={1}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography variant="h4">4</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider></Divider>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
