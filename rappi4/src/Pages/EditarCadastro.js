import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useForm from "../Hooks/UseForm";
import { BASE_URL } from "../Constants/urls";
import { vaiParaPerfil } from "../Router/RouteFunctions";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { HeaderEditarCadastro } from "../Constants/Headers/HeaderEditarCadastro";
const EditarCadastroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .Conteudo {
    .input1{
      margin-top:20px;
    }

    .input_text {
      width: 90vw;
      height: 72px;

      input:focus {
        border: 1px solid;
        border-color: red;
        outline-style: none;
        border-style: none;
      }

      input {
        border-color: #e86e5a;
      }
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    p {
      margin-top: 28px;
      margin-bottom: 20px;
      font-family: "Roboto", sans-serif;
      font-weight: 600;
    }
    .input_btn {
      width: 90vw;
      height: 42px;
      background-color: #e86e5a;
      color: black;
    }
  }
`;
const EditarCadastro = () => {
  const navigate = useNavigate();
  useProtectedPage();

  const [form, onChange, clear] = useForm({
    name: "",
    email: "",
    cpf: "",
  });

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(form);
    clear();
  };

  const onSubmitCadastro = () => {
    const token = localStorage.getItem("token");

    axios
      .put(`${BASE_URL}/profile`, form, {
        headers: {
          auth: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.token);
        navigate("/perfil");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <EditarCadastroContainer>
      <div className="Conteudo">
        <HeaderEditarCadastro />
        <form className="Conteudo" onSubmit={onSubmitForm}>
          <TextField
            sx={{ borderColor: "black" }}
            className="input_text input1"
            id="outlined-basic"
            placeholder="Nome e Sobrenome"
            label="Nome"
            variant="outlined"
            type={"text"}
            value={form.name}
            name={"name"}
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
            name={"email"}
            onChange={onChange}
            type={"email"}
            required
          />

          <TextField
            value={form.cpf}
            className="input_text"
            name={"cpf"}
            onChange={onChange}
            placeholder="000.000.000-00"
            required
            pattern={"d{3}.d{3}.d{3}-d{2}"}
            title={"Digite um CPF no formato: xxx.xxx.xxx-xx"}
          />

          <Button
            className="input_btn"
            type={"submit"}
            onClick={onSubmitCadastro}
            disableElevation
            variant="contained"
          >
            Salvar
          </Button>
        </form>
      </div>
    </EditarCadastroContainer>
  );
};

export default EditarCadastro;
