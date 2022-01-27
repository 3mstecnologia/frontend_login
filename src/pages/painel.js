import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import jwt from "jsonwebtoken";
import { api } from "../services/api";
import Logout from "../services/logout";

export default function Painel(dados_usuario) {
  const [user, setUser] = useState(dados_usuario.dados_usuario);
  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div>
      <div>
        <h1>Painel </h1>
        <h1>Ola {user.nome}</h1>
      </div>

      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  console.log("token-------", token);
  if (token) {
    var decoded = jwt.decode(token, "senhadoemajuniplac");
    console.log("decoded-------", decoded);
    var usuario = await api.post("/recuperaUsuario", {
      id: decoded.user.id,
    });
    console.log("usuario-------", usuario.data[0]);
    return {
      props: {
        dados_usuario: usuario.data[0],
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
