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
  image: string;
  views: number;
  voteCount: number;
  postComments: [];
  tagList: tagList[];
  postId: number;
  user: userLogin;
  blogPostCount: number;
  commentCount: number;
}

export interface tagList {
  tagId: number;
  tagName: string;
}

export interface userLogin {
  id: number;
  user: string;
  email: string;
  role: string;
  roles: [];
  fullName: string;
  picture: string;
}
