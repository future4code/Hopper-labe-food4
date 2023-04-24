import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useForm from "../Hooks/UseForm"
import { BASE_URL } from "../Constants/urls"
import { vaiParaLogin } from "../Router/RouteFunctions";
import { CadastroContainer } from "../Styles/CadastroStyled";
import { HeaderLogin } from "../Constants/Headers/HeaderLogin";
import { Button, TextField } from "@mui/material";


const Cadastro = () => {
  const navigate = useNavigate();
  const [form, onChange, clear] = useForm({
    name: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  })

  const onSubmitForm = (event) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('As senhas não são iguais')
    } else {
      navigate("/endereco")
    }
    console.log(form)
    //clear()
  }

  const onSubmitCadastro = () => {
    axios
      .post(`${BASE_URL}/signup`, form)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/endereco");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <CadastroContainer>
      <HeaderLogin />
      {/* <h1>Cadastrar</h1>
      <button onClick={() => vaiParaLogin(navigate)}>Voltar</button> */}

      <form className="Conteudo" onSubmit={onSubmitForm}>

        <img onClick={() => vaiParaLogin(navigate)} src='https://raw.githubusercontent.com/future4code/julian-rappi4B/master/src/assets/logo-future-eats-invert%403x.png' alt="logo" />
        <p className="cadastro_title">Cadastrar</p>

        <TextField
          sx={{ borderColor: 'black' }}
          className="input_text"
          id="outlined-basic"
          placeholder="Nome e Sobrenome"
          label="Nome"
          variant="outlined"
          type={'text'}
          value={form.name}
          name={'name'}
          onChange={onChange}
          required
        />


        <TextField
          className="input_text"
          id="outlined-basic"
          placeholder="email@email.com"
          label="Email"
          variant="outlined"


          value={form.email}
          name={'email'}
          onChange={onChange}
          type={'email'}
          required
        />

        <TextField
          className="input_text"
          id="outlined-basic"
          label="CPF"
          variant="outlined"


          value={form.cpf}
          name={'cpf'}
          onChange={onChange}
          placeholder="000.000.000-00"
          required
          pattern={"\d{3}\.\d{3}\.\d{3}-\d{2}"}
          title={"Digite um CPF no formato: xxx.xxx.xxx-xx"}
        />

        <TextField
          className="input_text"
          id="outlined-basic"
          variant="outlined"


          value={form.password}
          name={'password'}
          label={'Senha'}
          onChange={onChange}
          placeholder="Mínimo 6 caracteres"
          required
          type={'password'}

        />

        <TextField

          className="input_text"
          id="outlined-required"
          label="Confirmar Senha"
          variant="outlined"
          value={form.confirmPassword}
          name={'confirmPassword'}
          onChange={onChange}
          placeholder="Confirmar Senha"
          required
          type={'password'}


        />


        <Button className="input_btn" type={'submit'} onClick={onSubmitCadastro} disableElevation variant="contained">Criar</Button>


      </form>



    </CadastroContainer>

  );
};

export default Cadastro;