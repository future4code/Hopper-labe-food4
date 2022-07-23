import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import  useForm  from "../Hooks/UseForm"
import { BASE_URL } from "../Constants/urls";


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
    //signUp(form, clear, navigate)
  }

  const onSubmitCadastro = () => {
    axios
    .post(`${BASE_URL}/signup`, form)
    .then((res) => {
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    })
    .catch((err) => {
      console.log(err.response.data);
      alert("Usuário não cadastrado")
    });
  }

  return (
    <div>
      <h1>Cadastrar</h1>
      <form onSubmit={onSubmitForm}>
        <input
          value={form.name}
          name={'name'}
          onChange={onChange}
          placeholder="nome"
          required
          />
          <input
          value={form.email}
          name={'email'}
          onChange={onChange}
          placeholder="email"
          required
          type={"email"}
          />
          <input
          value={form.cpf}
          name={'cpf'}
          onChange={onChange}
          placeholder="CPF"
          required
          type={"cpf"}
          />
          <input
          value={form.password}
          name={'password'}
          onChange={onChange}
          placeholder="senha"
          required
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