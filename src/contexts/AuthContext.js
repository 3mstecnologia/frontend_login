import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import jwt from "jsonwebtoken";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const isAuthenticated = !!user;
  //console.log("auth-------", user);

  useEffect(() => {
    const { token } = parseCookies();
    //console.log("entrou no effect", token);
    if (token) {
      //console.log("entrou no IF");
      buscarUsuario(token).then((user) => {
        setUser(user);
      });
      //console.log("user-------", user);
      setUser(user);
    }
  }, []);

  async function signIn(cpf, senha) {
    var { data } = await api.post("/login", {
      cpf: cpf,
      senha: senha,
    });
    setUser(data.user);
    setToken(data.token);
    //console.log(data.token);
    setCookie(null, "token", data.token, {
      maxAge: 60 * 60 * 12, // 12 horas
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/painel");
  }
  async function buscarUsuario(token) {
    //console.log("entrou no buscarUsuario", token);
    var decoded = jwt.decode(token, "senhadoemajuniplac");
    //console.log("decoded-------", decoded);
    var usuario = await api.post("/recuperaUsuario", {
      id: decoded.user.id,
    });
    //console.log("usuario-------", usuario.data[0]);

    return usuario.data;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
