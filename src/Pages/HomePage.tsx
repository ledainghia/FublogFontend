import {
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { Helmet } from "react-helmet-async";

import { ChangeEvent, Suspense, useCallback, useEffect, useState } from "react";
import { getAllBlog, getAllBlogNotPagination } from "../APICall/apiConfig";
import PostCard from "../components/PostCard";
import { blog } from "../config/TypeDefine";
import { extractTextFromHtml } from "../tools/extractTextFromHtml";
import SuspenseLoader from "../components/SuspenseLoader";
import { set } from "nprogress";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Loading from "../components/Loading";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

export default function HomePage() {
  const [posts, setPosts] = useState<blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let limitPostPerPage: number = 10;
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await getAllBlog();
        const allBlogsPost: blog[] = res.data.data.list;
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
          if (value === 0) {
            setPosts(blogPosts);
            setTotalPages(Math.ceil(blogPostCount / limitPostPerPage));
          } else {
            const blogPostsSort = blogPosts.sort(
              (a: blog, b: blog) => b.views - a.views
            );
            setPosts(blogPostsSort);
            setTotalPages(Math.ceil(blogPostCount / limitPostPerPage));
          }
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [update]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await getAllBlogNotPagination();
        console.log(res.data.data.dtoList);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fecthData();
  }, [loading]);

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // Tính lại totalPages dựa trên số lượng bài viết sau tìm kiếm
    const filteredPosts = posts.filter((post: blog) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    const newTotalPages = Math.ceil(filteredPosts.length / limitPostPerPage);
    setTotalPages(newTotalPages);
  }, [searchValue, limitPostPerPage, posts]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      setPage(1);
    },
    [setSearchValue, setPage]
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    console.log("newValue", newValue);
    setValue(newValue);
    setUpdate(!update);
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
          <Grid item xs={12}>
            <Stack direction={{ xs: "column" }} display={{ xs: "flex" }}>
              <CardHeader
                title={
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab
                      sx={{ fontSize: 15 }}
                      wrapped
                      label="NEWEST"
                      {...a11yProps(0)}
                    />

                    <Tab
                      sx={{ fontSize: 15 }}
                      wrapped
                      label="trending"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                }
                action={
                  <>
                    <SearchInputWrapper
                      sx={{ backgroundColor: "transparent" }}
                      value={searchValue}
                      autoFocus={true}
                      onChange={handleSearchChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Search terms here..."
                      fullWidth
                      label="Search"
                    />
                  </>
                }
              />
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                {posts &&
                  posts
                    .filter((post: blog) =>
                      post.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )
                    .slice(
                      (page - 1) * limitPostPerPage,
                      page * limitPostPerPage
                    )
                    .map((post: blog) => {
                      return (
                        <>
                          <Card>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                height: 150,
                              }}
                            >
                              <PostCard key={post.postId} blogPost={post} />
                            </div>
                            <Divider />
                          </Card>
                        </>
                      );
                    })}
                {posts.length === 0 && <Loading />}
              </Card>
            </Stack>
          </Grid>
          {!page && (
            <Grid item xs={12}>
              <div className="custom-loader"></div>
            </Grid>
          )}
          {page && (
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
          )}
        </Grid>
      </Container>
    </>
  );
}
