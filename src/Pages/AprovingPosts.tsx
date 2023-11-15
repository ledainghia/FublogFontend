import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  approving,
  blogPostApprove,
  getBlogByRequest,
} from "../APICall/apiConfig";
import EditorRend from "../components/ckEditorView";
import { blog } from "../config/TypeDefine";
import {
  useToastErrorStore,
  useToastSuccessStore,
} from "../config/ZustandStorage";
import { getUserInfoFromLocal } from "../tools/getUserInfoFromLocal";
const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Data</Box>
    </StyledGridOverlay>
  );
}

export default function AprovingPosts() {
  const [update, setUpdate] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<blog | null>(null);
  const [postDefault, setPostDefault] = useState<blog[] | null>(null);

  const { addToastSuccess } = useToastSuccessStore();
  const { addToastError } = useToastErrorStore();
  const handleOpen = (blog: any) => {
    setOpenModal(true);
    console.log("blog", blog);
    const data = postDefault?.filter((post) => post.postId === blog.ID);
    console.log("blog", data);
    if (data && data.length !== 0) setModalContent(data[0]);
  };
  const handleClose = () => setOpenModal(false);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await getBlogByRequest();
        console.log(res);
        const allBlogsPost: blog[] = res.data.data.list;

        if (allBlogsPost.length > 0 && res.status === 200) {
          const blogPosts = allBlogsPost.map((allBlogPosts: blog) => {
            let date: Date = new Date(allBlogPosts.createdDate);
            const month = date.toLocaleString("en-vn", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            allBlogPosts.createdDate = month;

            return allBlogPosts;
          });
          const blogTable = blogPosts.map((blogPosts: blog, index) => {
            return {
              id: index,
              ID: blogPosts.postId,
              Image: blogPosts.picture,
              Title: blogPosts.title,
              Author: blogPosts.user.fullName,
              Category: blogPosts.categoryName,
              Content: blogPosts.content,
              Status: "Pending",
              Reason: blogPosts.reason,
              Date: blogPosts.createdDate,
            };
          });
          console.log("blog", blogTable);
          setPosts(blogTable);
          setPostDefault(blogPosts);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, [update]);

  const handleApprove = async (id: number, action: "approve" | "reject") => {
    try {
      let rs: string | null = "";
      if (action === "reject") {
        rs = prompt("Please input reason");
        if (rs === null) return;
      }
      const data: blogPostApprove = {
        postId: id,
        reason: rs,
        reviewId: getUserInfoFromLocal().id,
      };
      const res = await approving(action, data);
      console.log(res);
      setUpdate(!update);
      addToastSuccess(`${action} successfully`);
    } catch (error) {
      console.log(error);
      addToastError(`${action} failed}`);
    }
    setOpenModal(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography variant="h3">Approving post</Typography>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Box sx={{ width: "100%" }}>
              <DataGrid
                columns={[
                  { field: "ID" },
                  {
                    field: "Image",
                    renderCell: (params) => (
                      <img
                        src={params.value}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ),
                  },
                  { field: "Title", width: 300 },
                  { field: "Author", width: 300 },
                  { field: "Category" },

                  {
                    field: "Status",
                    renderCell: (params) => (
                      <Chip
                        label={params.value}
                        variant="filled"
                        color="default"
                      />
                    ),
                  },
                  { field: "Reason" },
                  { field: "Date", width: 150 },
                  {
                    field: "Action",
                    width: 300,
                    align: "center",
                    headerName: "Action",
                    headerAlign: "center",
                    renderCell: (params) => (
                      <div>
                        <Button
                          sx={{ p: 0.5 }}
                          color="info"
                          variant="outlined"
                          onClick={() => handleOpen(params.row)}
                          disabled={params.row.Status !== "Pending"}
                        >
                          Preview
                        </Button>
                        <Button
                          sx={{ ml: 1, p: 0.5 }}
                          color="success"
                          variant="outlined"
                          onClick={() =>
                            handleApprove(params.row.ID, "approve")
                          }
                          disabled={params.row.Status !== "Pending"}
                        >
                          Approve
                        </Button>
                        <Button
                          sx={{ ml: 1, p: 0.5 }}
                          color="error"
                          variant="outlined"
                          onClick={() => handleApprove(params.row.ID, "reject")}
                          disabled={params.row.Status !== "Pending"}
                        >
                          Deny
                        </Button>
                      </div>
                    ),
                  },
                ]}
                rows={posts}
                slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                sx={{ "--DataGrid-overlayHeight": "300px" }}
                disableRowSelectionOnClick
                disableColumnSelector
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      {modalContent && (
        <Dialog open={openModal} onClose={handleClose} fullScreen>
          <DialogTitle>Preview content</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} paddingX={3} position="sticky" top={0}>
              <Grid item xs={12}>
                <div className="post post-single">
                  <div className="post-header">
                    <h1 className="title mt-0 mb-3">{modalContent?.title}</h1>
                    <ul className="meta list-inline mb-0">
                      <li className="list-inline-item">
                        <Link to={`/profile/${modalContent?.user.id}`}>
                          <img
                            src={modalContent?.user.picture}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                            className="author"
                            alt="author"
                          />
                          {modalContent?.user.fullName}
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">{modalContent?.categoryName}</a>
                      </li>
                      <li className="list-inline-item">
                        {modalContent
                          ? new Date(
                              modalContent.createdDate
                            ).toLocaleDateString("en-VN")
                          : null}
                      </li>
                    </ul>
                  </div>
                  <div className="featured-image">
                    <img
                      src={modalContent?.picture}
                      style={{ width: "50%" }}
                      alt="post-title"
                    />
                  </div>
                </div>
                <div className="preview_content">
                  <CKEditor
                    editor={EditorRend}
                    disabled
                    data={modalContent?.content}
                  ></CKEditor>
                </div>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApprove(modalContent.postId, "approve")}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleApprove(modalContent.postId, "reject")}
            >
              Deny
            </Button>
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
