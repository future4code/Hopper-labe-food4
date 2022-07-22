import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCadastro, vaiParaLogin } from "../Router/RouteFunctions";


const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  };
  
  const onChangePassword = (event) => {
    setPassword(event.target.value)
  };

  const onSubmitLogin = () => {
    const url = `${BASE_URL}/login`;

    const body = {
      email: email,
      password: password
    };

    axios
      .post(url, body)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("Usuário não encontrado")
      });
  };

  return (
    <div>
        <h1>Login</h1>
        <button onClick={() => vaiParaLogin(navigate)}>Entrar</button>
        <button onClick={() => vaiParaCadastro(navigate)}>Não possui cadastro? Clique aqui.</button>

        <input placeholder="email" 
        type="email" 
        value={email} 
        onChange={onChangeEmail}
      />

      <input placeholder="senha" 
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <button onClick={onSubmitLogin}>Entrar</button>
    </div>
  );
};

export default Home;