import {
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";

import { Helmet } from "react-helmet-async";

import { Suspense, useEffect, useState } from "react";
import { getAllBlog } from "../APICall/apiConfig";
import PostCard from "../components/PostCard";
import { blog } from "../config/TypeDefine";
import { extractTextFromHtml } from "../tools/extractTextFromHtml";
import SuspenseLoader from "../components/SuspenseLoader";

export default function HomePage() {
  const [posts, setPosts] = useState<blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let limitPostPerPage: number = 10;

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await getAllBlog({ page: page, size: limitPostPerPage });
        const allBlogsPost: blog[] = res.data.data.dtoList;
        const blogPostCount: number = res.data.data.elementCount;

        if (allBlogsPost.length > 0 && res.status === 200) {
          const blogPosts = allBlogsPost.map((allBlogPosts: blog) => {
            let date: Date = new Date(allBlogPosts.createdDate);
            const month = date.toLocaleString("en-vn", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            allBlogPosts.createdDate = month;
            allBlogPosts.content = extractTextFromHtml(allBlogPosts.content);
            return allBlogPosts;
          });

          setPosts(blogPosts);
          setTotalPages(Math.ceil(blogPostCount / limitPostPerPage));
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Content Creater</title>
      </Helmet>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Suspense fallback={<SuspenseLoader />}>
            <Grid item xs={12}>
              <Stack direction={{ xs: "column" }} display={{ xs: "flex" }}>
                <CardHeader title="Newest" />
                <Card sx={{ display: "flex", flexDirection: "column" }}>
                  {posts &&
                    posts.map((post: blog) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: 195,
                            }}
                            key={post.postId}
                          >
                            <PostCard blogPost={post} />
                          </div>
                          <Divider />
                        </>
                      );
                    })}
                </Card>
              </Stack>
            </Grid>
          </Suspense>

          <Grid item xs={12}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              style={{ display: "flex", justifyContent: "center" }}
              variant="outlined"
              shape="rounded"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
