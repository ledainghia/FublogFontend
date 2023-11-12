import { userLogin } from "../config/TypeDefine";

export function getUserInfoFromLocal(): userLogin | null {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    return user;
  }
  return null;
}
