import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import PersonAddAltTwoToneIcon from "@mui/icons-material/PersonAddAltTwoTone";
import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone";

import {
  TextField,
  Grid,
  Stack,
  InputAdornment,
  Card,
  Divider,
  Pagination,
  Avatar,
  Typography,
  Button,
  styled,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  CardHeader,
  IconButton,
  CardContent,
  AvatarGroup,
} from "@mui/material";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useParams } from "react-router";
import {
  checkFollow,
  getBlogPostByAuthor,
  getCountViewOfBlogByUser,
  getCountPostMarkByUser,
  getUserInfor,
  getFollowerCount,
  getFollowingCount,
} from "../../APICall/apiConfig";
import Loading from "../../components/Loading";
import PostCard from "../../components/PostCard";
import { userLogin, blog } from "../../config/TypeDefine";
import { extractTextFromHtml } from "../../tools/extractTextFromHtml";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostCardMyProfile from "../../components/PostCardMyProfile";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
    
        .MuiInputBase-input {
            font-size: ${theme.typography.pxToRem(17)};
        }
    `
);

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
export default function Wall() {
  const userCurrent: userLogin = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  const [blogPost, setBlogPost] = useState<blog[]>([]);
  const [followerCount, setFollowerCount] = useState<number | null>(null);
  const [followingCount, setFollowingCount] = useState<number | null>(null);
  const userID = userCurrent.id.toString();

  const [totalPages, setTotalPages] = useState(1);
  const [countViewOfBlog, setCountViewOfBlog] = useState<number>(0);
  const [countPostMark, setCountPostMark] = useState<number>(0);

  const [blogPostsCount, setBlogPostsCount] = useState<number>(0);
  const [user, setUser] = useState<userLogin | null>(null);

  useEffect(() => {
    checkFollow(userCurrent.id.toString(), userID)
      .then((response) => {
        console.log("CheckFollow", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getBlogPostByAuthor(userID, page.toString(), limitPostPerPage.toString())
      .then((response) => {
        const allBlogsPost: blog[] = response.data.data.dtoList;
        const blogPostCount: number = response.data.data.elementCount;

        if (allBlogsPost.length > 0 && response.status === 200) {
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

          setBlogPost(blogPosts);
          setTotalPages(Math.ceil(blogPostCount / limitPostPerPage));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getCountViewOfBlogByUser(userID)
      .then((response) => {
        console.log("getCountViewOfBlog", response.data);
        setCountViewOfBlog(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getCountPostMarkByUser(userID)
      .then((response) => {
        console.log("getCountPostMarkByUser", response.data);
        setCountPostMark(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getUserInfor(userID)
      .then((response) => {
        console.log("getUserInfor", response.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    setBlogPost,
    userID,

    setTotalPages,
    setCountViewOfBlog,
    setCountPostMark,
    setBlogPostsCount,
    setUser,
  ]);

  useEffect(() => {
    getFollowerCount(userID)
      .then((response) => {
        console.log("getFollowerCount", response.data.data);
        setFollowerCount(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setFollowerCount, userID]);

  useEffect(() => {
    getFollowingCount(userID)
      .then((response) => {
        console.log("getFollowerCount", response.data.data);
        setFollowingCount(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setFollowingCount, userID]);

  const [page, setPage] = useState(1);
  let limitPostPerPage: number = 10;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // Tính lại totalPages dựa trên số lượng bài viết sau tìm kiếm

    const filteredPosts = blogPost.filter((post: blog) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    const newTotalPages = Math.ceil(filteredPosts.length / limitPostPerPage);
    setTotalPages(newTotalPages);
  }, [searchValue, limitPostPerPage, blogPost]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      setPage(1);
    },
    [setSearchValue, setPage]
  );

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
        p={2}
      >
        <Grid item xs={12} md={4} spacing={10}>
          <Card>
            <CardHeader
              title="Profile Information"
              action={
                <IconButton aria-label="settings">
                  <ModeEditOutlineTwoToneIcon />
                </IconButton>
              }
            ></CardHeader>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="body2" component="div">
                  <strong>Role</strong>: {user?.role}
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>Email</strong>: {user?.email}
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>Point</strong>: {user?.point} pt
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>View</strong>: {countViewOfBlog}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 4 }}>
            <CardHeader title="Followers"></CardHeader>
            <CardContent>
              <Stack spacing={1}>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                  <Button variant="outlined">Unfollow </Button>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                  <Button variant="outlined">Unfollow </Button>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                  <Button variant="outlined">Unfolow </Button>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                  <Button variant="outlined">Follow</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 4 }}>
            <CardHeader title="Following"></CardHeader>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider></Divider>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider></Divider>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider></Divider>
                <Stack direction={"row"} spacing={2}>
                  <Avatar variant="rounded" alt="user"></Avatar>
                  <Stack>
                    <Typography variant="h5" component="div">
                      {user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user?.email}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack direction={{ xs: "column" }} display={{ xs: "flex" }}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardHeader title="Your blog posts"></CardHeader>
              <SearchInputWrapper
                value={searchValue}
                autoFocus={true}
                sx={{ margin: 2 }}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search terms here..."
                label="Search"
              />
              {blogPost &&
                blogPost
                  .filter((post: blog) =>
                    post.title.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .slice((page - 1) * limitPostPerPage, page * limitPostPerPage)
                  .map((post: blog) => {
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
                          <BootstrapTooltip title={"ádasda"}>
                            <PostCardMyProfile blogPost={post} />
                          </BootstrapTooltip>
                        </div>
                        <Divider />
                      </>
                    );
                  })}

              {blogPost && blogPost.length === 0 && <Loading />}
            </Card>
          </Stack>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 30,
            }}
            variant="outlined"
            shape="rounded"
          />
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
}
