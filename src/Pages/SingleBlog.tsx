import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { blog } from "../config/TypeDefine";
import { Card, Container, Grid } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import EditorRend from "../components/ckEditorView";
import "../assets/css/ckeditor.css";
import TableOfContents from "../components/TableOfContents";
import tableOfContentsReplace from "../tools/tableOfContentsReplace";
export default function SingleBlog() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<blog | null>(null);
  const [content, setContent] = useState<string>("");
  const [tableOfContents, setTableOfContents] = useState<string>("");

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

  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (elem) => ({
        text: (elem as HTMLElement).innerText,
      })
    );
    console.log(elements);
  }, []);

  const [contentWithAnchors, setContentWithAnchors] = useState<string>("");

  return (
    <>
      <Container maxWidth="lg">
        <Card>
          <Grid container spacing={3} paddingX={3}>
            <Grid item xs={12}>
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
                  <img
                    src={post?.picture}
                    style={{ width: "100%" }}
                    alt="post-title"
                  />
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
            {/* <Grid item xs={3}>
              <h1>Table of Contents</h1>
              <div className="preview_tableofcontent">
                <CKEditor
                  editor={EditorRend}
                  disabled
                  data={content}
                ></CKEditor>
              </div>
            </Grid> */}
          </Grid>
        </Card>
      </Container>
    </>
  );
}
