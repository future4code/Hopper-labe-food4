import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCadastro } from "../Router/RouteFunctions";
import { LoginContainer } from "../Styles/LoginStyled";
import { Button, TextField } from "@mui/material";


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

    <LoginContainer>


      <div className="Conteudo">

        <img src='https://raw.githubusercontent.com/future4code/julian-rappi4B/master/src/assets/logo-future-eats-invert%403x.png' alt="logo" />

        <p>Entrar</p>

        <TextField className="input_text" id="outlined-basic" placeholder="email@email.com" label="Email" variant="outlined" type={'email'} value={email} onChange={onChangeEmail} required />

        <TextField className="input_text" id="outlined-basic" placeholder="Mínimo 6 caracteres" label="Senha" variant="outlined" type={'password'} value={password} onChange={onChangePassword} required />

        <Button className="input_btn" onClick={onSubmitLogin} disableElevation variant="contained">Entrar</Button>

        {/* <button >Entrar</button> */}
        <p onClick={() => vaiParaCadastro(navigate)}>Não possui cadastro? Clique aqui.</p>

      </div>

    </LoginContainer>


  );

};

export default Home;