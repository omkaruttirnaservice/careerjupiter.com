import Cookies from "js-cookie";
export function getAuthHeader() {
  const token = Cookies.get("token");
  return `Bearer ${token ? token : ""}`;
}
