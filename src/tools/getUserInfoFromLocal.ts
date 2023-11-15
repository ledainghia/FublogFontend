export function getUserInfoFromLocal() {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    return user;
  }

  return {};
}
