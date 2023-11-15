import { CKEditor } from "@ckeditor/ckeditor5-react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/css/ckeditor.css";
import EditorRend from "../components/ckEditorView";
import { blog } from "../config/TypeDefine";

export default function SingleBlog() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<blog | null>(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(
          `https://api.fublog.tech/api/v1/auth/blogPosts/getBlogById/${id}`
        );
        setPost(response.data.data);
        // console.log(response.data.data.content);
        setContent(
          response.data.data.content
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();
  }, [id]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (elem) => ({
        text: (elem as HTMLElement).innerText,
      })
    );
    console.log(elements);
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const stack = document.getElementById("sticky-stack");
  //     if (stack) {
  //       if (window.pageYOffset > stack.offsetTop) {
  //         stack.style.position = "fixed";
  //         stack.style.top = "80px";
  //       } else {
  //         stack.style.position = "static";
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Card>
          <Grid container spacing={3} paddingX={3} position="sticky" top={0}>
            <Grid item xs={1} position="sticky" top={0}>
              <Box position="sticky" top={0}>
                <Stack
                  id="sticky-stack"
                  style={{ paddingTop: 100 }}
                  direction="column"
                  spacing={2}
                >
                  <IconButton color="secondary">
                    <ArrowUpwardIcon />
                  </IconButton>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    3
                  </Typography>
                  <IconButton color="secondary">
                    <ArrowDownwardIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <BookmarkIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={11}>
              <div className="post post-single">
                <div className="post-header">
                  <h1 className="title mt-0 mb-3">{post?.title}</h1>
                  <ul className="meta list-inline mb-0">
                    <li className="list-inline-item">
                      <Link to={`/profile/${post?.user.id}`}>
                        <img
                          src={post?.user.picture}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                          className="author"
                          alt="author"
                        />
                        {post?.user.fullName}
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{post?.categoryName}</a>
                    </li>
                    <li className="list-inline-item">
                      {post
                        ? new Date(post.createdDate).toLocaleDateString("vn-VN")
                        : null}
                    </li>
                  </ul>
                </div>
                <div className="featured-image">
                  <img src={post?.picture} alt="post-title" />
                </div>
              </div>
              <div className="preview_content">
                <CKEditor
                  editor={EditorRend}
                  disabled
                  data={content}
                ></CKEditor>
              </div>
            </Grid>
          </Grid>
        </Card>

        {/* <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h3">Comment</Typography>
            <Stack direction={"column"}>
              <Card sx={{ p: 2, boxShadow: "none" }}>
                <Stack direction={"row"} spacing={4}>
                  <Avatar
                    sx={{ height: 60, width: 60 }}
                    alt="PIC"
                    variant="rounded"
                  ></Avatar>
                  <Stack direction={"column"}>
                    <Typography variant="h4">Le Dai Nghia</Typography>
                    <Typography variant="caption">
                      Jan 08, 2021 14:41 pm
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quidem doloribus maxime placeat maiores soluta modi
                      dolores perspiciatis vero amet inventore pariatur illo
                      unde quo similique, eveniet ea accusantium velit
                      molestias.
                    </Typography>

                    <Button sx={{ width: 40, mt: 1 }} variant="contained">
                      Reply
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
            <Divider></Divider>
            <Stack direction={"column"} pl={10}>
              <Card sx={{ p: 2, boxShadow: "none" }}>
                <Stack direction={"row"} spacing={4}>
                  <Avatar
                    sx={{ height: 60, width: 60 }}
                    alt="PIC"
                    variant="rounded"
                  ></Avatar>
                  <Stack direction={"column"}>
                    <Typography variant="h4">Le Dai Nghia</Typography>
                    <Typography variant="caption">
                      Jan 08, 2021 14:41 pm
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quidem doloribus maxime placeat maiores soluta modi
                      dolores perspiciatis vero amet inventore pariatur illo
                      unde quo similique, eveniet ea accusantium velit
                      molestias.
                    </Typography>

                    <Button sx={{ width: 40, mt: 1 }} variant="contained">
                      Reply
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
            <Divider></Divider>
            <Stack direction={"column"} pl={10}>
              <Card sx={{ p: 2, boxShadow: "none" }}>
                <Stack direction={"row"} spacing={4}>
                  <Avatar
                    sx={{ height: 60, width: 60 }}
                    alt="PIC"
                    variant="rounded"
                  ></Avatar>
                  <Stack direction={"column"}>
                    <Typography variant="h4">Le Dai Nghia</Typography>
                    <Typography variant="caption">
                      Jan 08, 2021 14:41 pm
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quidem doloribus maxime placeat maiores soluta modi
                      dolores perspiciatis vero amet inventore pariatur illo
                      unde quo similique, eveniet ea accusantium velit
                      molestias.
                    </Typography>

                    <Button sx={{ width: 40, mt: 1 }} variant="contained">
                      Reply
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
            <Divider></Divider>
            <Stack direction={"column"}>
              <Card sx={{ p: 2, boxShadow: "none" }}>
                <Stack direction={"row"} spacing={4}>
                  <Avatar
                    sx={{ height: 60, width: 60 }}
                    alt="PIC"
                    variant="rounded"
                  ></Avatar>
                  <Stack direction={"column"}>
                    <Typography variant="h4">Le Dai Nghia</Typography>
                    <Typography variant="caption">
                      Jan 08, 2021 14:41 pm
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quidem doloribus maxime placeat maiores soluta modi
                      dolores perspiciatis vero amet inventore pariatur illo
                      unde quo similique, eveniet ea accusantium velit
                      molestias.
                    </Typography>

                    <Button sx={{ width: 40, mt: 1 }} variant="contained">
                      Reply
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h3">Leave Comment</Typography>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Type your comment here..."
              style={{ width: "100%", marginTop: 10 }}
            />
            <Button sx={{ mt: 2 }} variant="contained">
              Submit
            </Button>
          </CardContent>
        </Card> */}
      </Container>
    </>
  );
}
