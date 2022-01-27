import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    console.log(data);
    await signIn(data.cpf, data.senha);
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <label>
          cpf:
          <input {...register("cpf")} type="text" name="cpf" />
        </label>
        <label>
          senha:
          <input {...register("senha")} type="password" name="senha" />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
