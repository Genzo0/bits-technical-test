import Cookies from "js-cookie";

export function logout() {
  Cookies.remove("authToken", {
    path: "/",
  });
  window.location.reload();
}
