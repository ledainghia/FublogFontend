import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonProps,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ChangeEvent, ElementType, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Markdown from "react-markdown";
import Editor from "../components/ckeditor";
import { set } from "nprogress";
import EditorRend from "../components/ckEditorView";
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
  const editorRef = useRef<string | HTMLElement>("");
  const [openAlert, setOpenAlert] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [value, setValue] = useState("");
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      setIsFilePicked(true);
      reader.readAsDataURL(files[0]);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      ["link", "image", "video"],
    ],
  };

  return (
    <>
      <Card sx={{ marginX: 1 }}>
        <Container maxWidth={false}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <h2>Write Blog</h2>
                <TextField
                  required
                  fullWidth
                  label="Type the title of your blog"
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  renderInput={(params) => (
                    <TextField
                      {...params}
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
                    onChange={(event, editor) => setValue(editor.getData())}
                    data="<p>Type your blog content here</p>"
                  />
                </div>
                <Button variant="contained">Submit</Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <h2>Preview</h2>
              <Card
                sx={{
                  height: "120vh",
                  overflow: "scroll",
                }}
              >
                <div style={{ margin: 10, position: "sticky", top: "10px" }}>
                  <CKEditor
                    editor={EditorRend}
                    disabled
                    data={value}
                  ></CKEditor>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];
