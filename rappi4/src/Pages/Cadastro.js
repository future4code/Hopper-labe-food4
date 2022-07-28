import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import  useForm  from "../Hooks/UseForm"
import { BASE_URL } from "../Constants/urls"
import { vaiParaLogin } from "../Router/RouteFunctions";


const Cadastro = () => {
  const navigate = useNavigate();
  const [form, onChange, clear] = useForm({
    name: '',
    email: '',
    cpf: '',
    password:''
  })

  const onSubmitForm = (event) => {
    event.preventDefault()
    console.log(form)
    clear()
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
    <div>
      <h1>Cadastrar</h1>
      <button onClick={() => vaiParaLogin(navigate)}>Voltar</button>
      <form onSubmit={onSubmitForm}>
        <input
          value={form.name}
          name={'name'}
          onChange={onChange}
          placeholder="Nome"
          required
          />
          <input
          value={form.email}
          name={'email'}
          onChange={onChange}
          placeholder="E-mail"
          required
          type={"email"}
          />
          <input
          value={form.cpf}
          name={'cpf'}
          onChange={onChange}
          placeholder="CPF"
          required
          pattern={"\d{3}\.\d{3}\.\d{3}-\d{2}"}
			    title={"Digite um CPF no formato: xxx.xxx.xxx-xx"}
          type={"cpf"}
          />
          <input
          value={form.password}
          name={'password'}
          onChange={onChange}
          placeholder="Senha"
          required
          type={"password"}
          />
        
        <button 
          onClick={onSubmitCadastro}
          type={"submit"}>
            
            Criar
          
        </button>
    </form>
    </div>
    
  );
};

export default Cadastro;