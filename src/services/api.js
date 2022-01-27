import axios from "axios";
import { parseCookies } from "nookies";

const token = parseCookies();

export const api = axios.create({ baseURL: "http://localhost:3030" });

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token.token}`;
}
