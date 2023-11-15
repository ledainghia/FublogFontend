import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../config/axiosConfig";
import { BASE_URL } from "./baseURL";

export const getBlogPostByAuthor = (
  authorID: string | undefined,
  page: string,
  size: string
) => {
  return axios.get(
    BASE_URL +
      "/api/v1/auth/blogPosts/getBlogPostByAuthor/" +
      authorID +
      "/" +
      page +
      "/" +
      size
  );
};

export const getUserInfor = (authorID: string | undefined) => {
  return axiosInstance.get("/api/v1/auth/user/getUser/" + authorID);
};

export const getPopularBlogPostByView = () => {
  return axios.get(
    BASE_URL + "/api/v1/auth/blogPosts/getPopularBlogPostByView"
  );
};

export const getPopularBlogPostByVote = () => {
  return axios.get(
    BASE_URL + "/api/v1/auth/blogPosts/getPopularBlogPostByVote"
  );
};

export const getFollowerCount = (authorID: string | undefined) => {
  return axiosInstance.get("/api/v1/auth/user/follower/count/" + authorID);
};

export const getFollowingCount = (authorID: string | undefined) => {
  return axiosInstance.get("/api/v1/auth/user/following/count/" + authorID);
};

export const getCountViewOfBlogByUser = (authorID: string | undefined) => {
  return axios.get(BASE_URL + "/api/v1/auth/user/countViewOfBlog/" + authorID);
};
export const getCountPostMarkByUser = (authorID: string | undefined) => {
  return axios.get(
    BASE_URL + "/api/v1/auth/user/countPostMarkByUser/" + authorID
  );
};

export const getNoticationByUser = (authorID: string | undefined) => {
  return axiosInstance.get("/notification/" + authorID);
};

export const checkFollow = (
  followerID: string | undefined,
  followingID: string | undefined
) => {
  return axiosInstance.put("/api/v1/auth/user/checkFollowAction", {
    follower: followerID,
    following: followingID,
  });
};

export const followAction = (
  action: string,
  followerID: string | undefined,
  followingID: string | undefined
) => {
  return axiosInstance.post("/api/v1/auth/user/followAction/" + action, {
    follower: followerID,
    following: followingID,
  });
};

export const getCategories = () => {
  return axios.get(BASE_URL + "/api/v1/auth/category/viewAll");
};

type userLogin = {
  name: string;
  email: string;
  picture: string;
};

export const loginGoggle = (token: string) => {
  const userL: userLogin = jwtDecode(token);
  const postData = {
    fullName: userL.name,
    email: userL.email,
    picture: userL.picture,
  };

  return axiosInstance.post("/api/v1/auth/google", postData, {
    timeout: 5000,
  });
};

export const getAllUserByDiamond = (page: number, size: number) => {
  return axios.get(
    BASE_URL + "/api/v1/auth/user/getAllUserByDiamond/" + page + "/" + size
  );
};
export const getAllUserByGold = (page: number, size: number) => {
  return axios.get(
    BASE_URL + "/api/v1/auth/user/getAllUserByGold/" + page + "/" + size
  );
};
export const getAllUserByPoint = () => {
  return axios.get(BASE_URL + "/api/v1/auth/user/getAllUserByPoint");
};
export const getAllUserBySilver = (page: number, size: number) => {
  return axios.get(
    BASE_URL + "/api/v1/auth/user/getAllUserBySilver/" + page + "/" + size
  );
};

export const signup = (data: any) => {
  return axios.post(BASE_URL + "/api/v1/auth/signup", data);
};

export const getAllBlog = () => {
  return axios.get(BASE_URL + `/api/v1/auth/blogPosts/getAllBlog`);
};

export const getUserCurrentInfo = () => {
  return axiosInstance.get("/api/v1/auth/getUserInfo");
};

export const getAllBlogNotPagination = () => {
  return axios.get(BASE_URL + "/api/v1/auth/blogPosts/getAllBlog");
};

export const getCategory = () => {
  return axios.get(BASE_URL + "/api/v1/auth/category/view");
};

export const insertPost = (data: any) => {
  return axiosInstance.post("/api/v1/auth/blogPosts/insert", data);
};

export const getBlogPostByCategory = () => {
  return axios.get(BASE_URL + "/api/v1/auth/blogPosts/getBlogPostByCategory");
};

export const getBlogByFollow = (userId: number) => {
  return axiosInstance.get(`/api/v1/auth/blogPosts/getBlogByFollow/${userId}`);
};

export const getMarkPostbyUser = (userId: number) => {
  return axiosInstance.get(`/api/v1/auth/user/getMarkPost/${userId}`);
};

export const countBlogByAllCategory = () => {
  return axiosInstance.get("/api/v1/auth/admin/countBlogByAllCategory");
};

export type blogPostApprove = {
  postId: number;
  reviewId: number;
  reason: string;
};

export const getBlogByRequest = () => {
  return axiosInstance.get(`/api/v1/auth/manageApprove/getBlogByRequest`);
};
export const approving = (action: string, data: blogPostApprove) => {
  return axiosInstance.put(`/api/v1/auth/manageApprove/${action}`, data);
};

export const insertBookmark = (data: any, action: "mark" | "unMark") => {
  return axiosInstance.post(`/api/v1/auth/user/markAction/${action}`, data);
};

export const checkBookmark = (data: any) => {
  return axiosInstance.put("/api/v1/auth/user/checkMark", data);
};

export const getAllUserAdmin = () => {
  return axiosInstance.get("/api/v1/auth/user/getAll");
};
