export const checkUser = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};
