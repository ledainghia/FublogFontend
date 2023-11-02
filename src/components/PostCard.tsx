import {
  Avatar,
  Box,
  CardActions,
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

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { blog } from "../config/TypeDefine";
import EstimatedReadingTime from "../tools/EstimatedReadingTime";
import PostPreview from "../tools/ContentPreview";
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
  return (
    <>
      <CardMedia
        component="img"
        sx={{ width: 250, objectFit: "contain" }}
        image={blogPost.image}
        alt={blogPost.title}
        loading="lazy"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
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
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {blogPost.user.fullName}
              </Typography>
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
            {blogPost.title}
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
        </CardContent>
        <CardActions disableSpacing>
          <BootstrapTooltip title="1,4K Views">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
              <Typography
                ml={1}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                1,4K
              </Typography>
            </IconButton>
          </BootstrapTooltip>

          <BootstrapTooltip title="1,4K Views">
            <IconButton aria-label="share">
              <BookmarksIcon />
              <Typography
                ml={1}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                1,4K
              </Typography>
            </IconButton>
          </BootstrapTooltip>

          <BootstrapTooltip title="1,4K Views">
            <IconButton aria-label="share">
              <ThumbsUpDownIcon />
              <Typography
                ml={1}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                1,4K
              </Typography>
            </IconButton>
          </BootstrapTooltip>

          <BootstrapTooltip title="1,4K Views">
            <IconButton aria-label="share">
              <VisibilityIcon />
              <Typography
                ml={1}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                1,4K
              </Typography>
            </IconButton>
          </BootstrapTooltip>
        </CardActions>
      </Box>
    </>
  );
}