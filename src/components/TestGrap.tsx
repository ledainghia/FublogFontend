import React from "react";
import { useQuery, gql } from "@apollo/client";
import client from "../config/apolloClient"; // Import Apollo Client instance

const GET_BLOG_POSTS = gql`
  query {
    getAllBlog {
      status
      message
      data {
        list {
          postId
          typePost
          title
          content
          picture
          categoryName
        }
      }
    }
  }
`;

function BlogPosts() {
  const { loading, error, data } = useQuery(GET_BLOG_POSTS, { client: client });
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    // Handle data, render React components with the fetched data
    // For example:
    return (
      <div>
        {data.getAllBlog.data.list.map(
          (post: {
            postId: React.Key | null | undefined;
            title:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            content:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <div key={post.postId}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Render other necessary data */}
            </div>
          )
        )}
      </div>
    );
  }

  return null;
}

export default BlogPosts;
