import { destroyCookie } from "nookies";

export default function Logout() {
  destroyCookie(null, "token");
  return <Redirect to="/login" />;
}
