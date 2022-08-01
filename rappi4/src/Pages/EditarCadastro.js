import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useForm from "../Hooks/UseForm"
import { BASE_URL } from "../Constants/urls"
import { vaiParaPerfil } from "../Router/RouteFunctions";
import { useProtectedPage } from "../Hooks/UseProtectPage";

const EditarCadastro = () => {
  const navigate = useNavigate();
  useProtectedPage()

  const [form, onChange, clear] = useForm({
    name: '',
    email: '',
    cpf: '',
  })

  const onSubmitForm = (event) => {
    event.preventDefault()
    console.log(form)
    clear()
  }

  const onSubmitCadastro = () => {

    const token = localStorage.getItem("token");

    axios
      .put(`${BASE_URL}/profile`, form, {
        headers: {
          auth: token,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res.data.token);
        navigate("/perfil");
      })
      .catch((err) => {
        console.log(err.response.data);

      });
  }



  return (
    <div>
      <h1>Editar</h1>
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
      </form>
      <button onClick={() => vaiParaPerfil(navigate)}>Voltar</button>
      <button
        onClick={onSubmitCadastro}
        type={"submit"}>

        Salvar

      </button>
    </div>
  );
};

export default EditarCadastro;