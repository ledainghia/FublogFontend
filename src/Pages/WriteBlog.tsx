import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonProps,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ChangeEvent, ElementType, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { getCategory, insertPost } from "../APICall/apiConfig";
import EditorRend from "../components/ckEditorView";
import Editor from "../components/ckeditor";
import { categories } from "../config/TypeDefine";
import {
  useTabNavStore,
  useToastErrorStore,
  useToastSuccessStore,
} from "../config/ZustandStorage";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { storage } from "../config/firebase";
import { getUserInfoFromLocal } from "../tools/getUserInfoFromLocal";
const ImgStyled = styled(Avatar)(({ theme }) => ({
  width: 240,
  height: 120,

  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

export default function WriteBlog() {
  const [openAlert, setOpenAlert] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [value, setValue] = useState("");
  const [imageURL, setImageURL] = useState<string>("");
  const { addToastSuccess } = useToastSuccessStore();
  const { addToastError } = useToastErrorStore();
  const [choiceCategory, setChoiceCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { setTabIndex } = useTabNavStore();
  var imageUTL = "";
  const uploadImageToFirebase = async (image: File) => {
    if (image && image.type.startsWith("image/")) {
      if (image?.size && image?.size > 20000000) {
        addToastError("You cannot upload image bigger than 2MB");
        console.log(image?.size);
      } else {
        console.log(image.type);
        const storageRef = ref(storage, `/files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress function
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress);
            // add progress for toast of upload image using toastify
          },
          (err) => {
            console.log(err);
            addToastError("Upload image failed");
          },
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              addToastSuccess("Upload image success");
              setImageURL(url);
              imageUTL = url;
              console.log(url);
            });
          }
        );
      }
    } else {
      addToastError("You cannot upload another file different image file");
    }
  };
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      setIsFilePicked(true);
      uploadImageToFirebase(files[0]);
      reader.readAsDataURL(files[0]);
    } else {
      setIsFilePicked(false);
    }
  };

  const [categories, setCategories] = useState<categories[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const {} = useTabNavStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await getCategory();
        setCategories(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
        setFlag(!flag);
      }
    };
    fecthData();
  }, [flag]);

  const handleSubmmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as HTMLFormElement).elements.namedItem(
      "title"
    ) as HTMLInputElement;

    const parentCategoryId = categories.find(
      (cate) => cate.categoryName === choiceCategory
    )?.parentCategoryId;
    if (!value) return addToastError("You cannot submit empty content");
    const postData = {
      title: title.value,
      categoryName: choiceCategory,
      parentCategoryId: parentCategoryId,
      image: imageURL,
      content: value,
      userId: getUserInfoFromLocal()?.id,
      typePost: "BLOG",
      tagList: [],
    };

    if (!postData.image) {
      addToastError("You cannot submit without image");
      return;
    }

    if (postData) {
      try {
        const res = await insertPost(postData);
        console.log(res);
        if (res.data.status === "ok") {
          addToastSuccess("Insert post success! Post is waiting approve ");
          setModalOpen(true);
        }
      } catch (error) {
        addToastError("Insert post failed");
      }
    }

    console.log("imageURL", postData);
  };
  function handleModalClose() {
    setModalOpen(false);

    setValue("");
    setTabIndex(0);
    navigate("/test");
  }

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "0px solid #fff",
            boxShadow: 24,
            p: 4,
            textAlign: "center", // Để căn giữa các phần tử theo chiều ngang
            borderRadius: "10px",
          }}
        >
          <h2>Post created successfully!</h2>
          <p>Do you want to create a new post or return to the home page?</p>
          <Button
            onClick={() => {
              setModalOpen(false);
            }}
            variant="contained"
            color="primary"
            sx={{ margin: "8px" }} // Tạo khoảng cách giữa hai nút
          >
            Create new post
          </Button>
          <Button
            onClick={handleModalClose}
            variant="outlined"
            color="primary"
            sx={{ margin: "8px" }} // Tạo khoảng cách giữa hai nút
          >
            Return to home page
          </Button>
        </Box>
      </Modal>
      <Card sx={{ marginX: 1 }}>
        <Container maxWidth={false}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} mb={4}>
              <form onSubmit={handleSubmmit}>
                <Stack spacing={2}>
                  <h2>Write Blog</h2>

                  <TextField
                    required
                    fullWidth
                    name="title"
                    label="Type the title of your blog"
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(event, value) => {
                      console.log(event);
                      setChoiceCategory(value);
                    }}
                    options={
                      categories.length !== 0
                        ? categories.map((category) => category.categoryName)
                        : []
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="category"
                        label="Choice category for your blog"
                        required
                      />
                    )}
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {isFilePicked ? (
                      <ImgStyled
                        defaultValue="picture"
                        variant="rounded"
                        src={imgSrc}
                        alt="Picture"
                      />
                    ) : (
                      <></>
                    )}

                    <Box>
                      <ButtonStyled
                        component="label"
                        variant="outlined"
                        htmlFor="account-settings-upload-image"
                      >
                        Upload photo preview
                        <input
                          hidden
                          type="file"
                          name="image"
                          onChange={onChange}
                          onClick={() => setIsFilePicked(true)}
                          accept="image/png, image/jpeg"
                          id="account-settings-upload-image"
                        />
                      </ButtonStyled>
                      {isFilePicked ? (
                        <ResetButtonStyled
                          color="error"
                          variant="outlined"
                          onClick={() => {
                            setImgSrc("");
                            setIsFilePicked(false);
                          }}
                        >
                          Reset
                        </ResetButtonStyled>
                      ) : (
                        <></>
                      )}

                      <Typography variant="body2" sx={{ marginTop: 2 }}>
                        Allowed PNG or JPEG.
                        <br /> Max size of 1MB.
                      </Typography>
                    </Box>
                  </Box>
                  <div style={{ marginTop: 20 }}>
                    <CKEditor
                      editor={Editor}
                      onChange={(event, editor) => {
                        setValue(editor.getData());
                        console.log(editor.getData());
                      }}
                      data={`<div class="table-of-contents"><ol><li><a href="#ed7b57a11d8fad4896c3689ae71d3a59f">DẪN NHẬP</a></li><li><a href="#e9ed55afe2a83cdf4140e9700ccba4792">NỘI DUNG</a></li><li><a href="#e368d2e9e0b6011f6b06a7b30b055331e">Biến là gì? Tại sao phải sử dụng biến?</a></li><li><a href="#ef168d4bb7f23ad7d30a651de3009fe3b">Tại sao phải sử dụng biến?</a></li><li><a href="#e21535b8a1bace432c6eb9a5b0cc573ef">Khai báo và sử dụng biến</a></li><li><a href="#e16f763581eba4295e88a73b9166f42a7">Sử dụng biến</a></li><li><a href="#ef7ba81fe097fe4ae9cbc651e44e4a892">Quy tắc đặt tên biến</a><ol><li><a href="#eb37d0d931cb35c9562eb00b7c08e2b42">Quy tắc Lạc Đà</a></li><li><a href="#e508632dde743f96cceba8bd65bb9ed17">Quy tắc Pascal</a></li></ol></li><li><a href="#e2c2678d7b461c31a2ac6f3d8b82b141e">KẾT LUẬN</a></li></ol></div><p>Type your blog content here</p>`}
                    />
                  </div>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={false} required />}
                    label="I agree to the terms and conditions. If I violate the terms and conditions, I will be responsible for the consequences."
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={(e) => e.preventDefault}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Grid>

            <Grid item xs={12} md={6}>
              <h2>Preview</h2>
              <Card
                sx={{
                  height: "120vh",
                  overflow: "scroll",
                }}
              >
                <CKEditor editor={EditorRend} disabled data={value}></CKEditor>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}
