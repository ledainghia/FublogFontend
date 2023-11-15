import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";

import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  checkBookmark,
  checkFollow,
  followAction,
  insertBookmark,
} from "../APICall/apiConfig";
import { blog } from "../config/TypeDefine";
import {
  useToastErrorStore,
  useToastSuccessStore,
} from "../config/ZustandStorage";
import PostPreview from "../tools/ContentPreview";
import EstimatedReadingTime from "../tools/EstimatedReadingTime";
import { getUserInfoFromLocal } from "../tools/getUserInfoFromLocal";
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

type props = {
  blogPost: blog;
};

export default function PostCard({ blogPost }: props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const userId = getUserInfoFromLocal().id;
  const { addToastSuccess } = useToastSuccessStore();
  const { addToastError } = useToastErrorStore();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res1 = await checkFollow(userId, blogPost.user.id.toString());
        const res2 = await checkBookmark({
          userId: userId,
          postId: blogPost.postId,
        });

        if (res1.data) {
          setIsFollowed(res1.data.data);
        }

        if (res2.data) {
          setIsBookmarked(res2.data.data);
        }
        console.log(res1);
        console.log(res2);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [isBookmarked, isFollowed, flag]);

  async function handleInsertBookmark(): Promise<void> {
    const userId = getUserInfoFromLocal().id;
    const data = {
      postId: blogPost.postId,
      userId: userId,
    };
    const res = await insertBookmark(data, isBookmarked ? "unMark" : "mark");
    if (res.status === 200) {
      addToastSuccess(`${isBookmarked ? "unMark" : "mark"} successfully`);
      setFlag(!flag);
    } else {
      addToastError(` ${isBookmarked ? "unMark" : "mark"} failed`);
    }
    console.log(res);
  }

  async function handleFollow(): Promise<void> {
    const userId = getUserInfoFromLocal().id;

    const res = await followAction(
      isFollowed ? "unfollow" : "follow",
      userId,
      blogPost.user.id.toString()
    );
    if (res.status === 200) {
      addToastSuccess(`${isFollowed ? "unfollow" : "follow"} successfully`);
      setFlag(!flag);
    } else {
      addToastError(`${isFollowed ? "unfollow" : "follow"} faliure`);
    }
    console.log(res);
  }

  return (
    <>
      <CardMedia
        component="img"
        sx={{ width: 250, objectFit: "contain", padding: 1 }}
        image={blogPost.picture}
        alt={blogPost.title}
        loading="lazy"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Stack
            direction={{ xs: "row", sm: "row" }}
            display={{ xs: "flex" }}
            spacing={{ xs: 2, sm: 2, md: 2 }}
          >
            <Avatar
              sx={{ height: "30px", width: "30px" }}
              alt={blogPost.user.fullName}
              src={blogPost.user.picture}
            />
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Link to={`/profile/${blogPost?.user.id}`}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {blogPost.user.fullName}
                </Typography>
              </Link>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {blogPost.typePost}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {blogPost.createdDate}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <EstimatedReadingTime articleText={blogPost.content} />
              </Typography>
            </Stack>
          </Stack>

          <Typography sx={{ mt: 1 }} component="div" variant="h4">
            <Link to={`/blog/${blogPost.postId}`}>{blogPost.title}</Link>
          </Typography>
          <Typography
            mt={1}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <PostPreview
              content={blogPost.content}
              maxLength={100}
            ></PostPreview>
          </Typography>
          <BootstrapTooltip title={`${blogPost.views} views`}>
            <IconButton aria-label="share">
              <VisibilityIcon />
              <Typography
                ml={1}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {blogPost.views}
              </Typography>
            </IconButton>
          </BootstrapTooltip>

          <BootstrapTooltip title={`${blogPost.voteCount} votes`}>
            <IconButton aria-label="share">
              <ThumbsUpDownIcon />
              <Typography
                ml={1}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {blogPost.voteCount}
              </Typography>
            </IconButton>
          </BootstrapTooltip>

          <BootstrapTooltip title={`${blogPost.bookMarkCount} bookmarks `}>
            <IconButton aria-label="share">
              <BookmarksIcon />
              <Typography
                ml={1}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {blogPost.bookMarkCount}
              </Typography>
            </IconButton>
          </BootstrapTooltip>
        </CardContent>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          float: "right",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {userId !== blogPost.user.id && (
          <ButtonGroup orientation="vertical" sx={{}}>
            <Button
              startIcon={<BookmarkAddTwoToneIcon />}
              onClick={() => handleInsertBookmark()}
            >
              {isBookmarked ? "Unbookmark" : "Bookmark"} this blog
            </Button>
            <Button
              startIcon={<PersonAddTwoToneIcon />}
              onClick={() => handleFollow()}
            >
              {isFollowed ? "Unfollow" : "Follow"} this content creator
            </Button>
          </ButtonGroup>
        )}
      </div>
    </>
  );
}
