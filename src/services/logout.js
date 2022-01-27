import { removeCookies } from "cookies-next";
import Router from "next/router";

export default function Logout() {
  removeCookies("token");
  Router.push("/login");
}
