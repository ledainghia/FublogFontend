export interface blog {
  typePost: string;
  title: string;
  content: string;
  categoryName: string;
  createdDate: string;
  modifiedDate: Date;
  approvedBy: number;
  status: boolean;
  isApproved: boolean;
  picture: string;
  views: number;
  votes: [];
  postComments: [];
  tagList: tagList[];
  postId: number;
  user: userLogin;
  blogPostCount: number;
  commentCount: number;
  voteCount: number;
}

export interface tagList {
  tagId: number;
  tagName: string;
}

export interface userLogin {
  username: string;
  id: number;
  user: string;
  email: string;
  role: string;
  roles: [];
  fullName: string;
  picture: string;
  ranking: string;
  point: number;
  countViewOfBlog: number;
  countVoteOfBlog: number;
}

export type categories = {
  lable: string;
  categoryId: number;
  categoryName: string;
  parentCategoryId: number | null;
};
