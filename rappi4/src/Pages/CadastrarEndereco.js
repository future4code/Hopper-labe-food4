import React from "react";
import { useNavigate } from "react-router-dom";
import { vaiParaPerfil, vaiParaEditarCadastro } from "../Router/RouteFunctions";
import useForm from "../Hooks/UseForm"
import axios from 'axios';
import { BASE_URL } from "../Constants/urls"
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { HeaderCadastrarEndereco } from "../Constants/Headers/HeaderCadastrarEndereco";


const CadastrarEnderecoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .Conteudo {
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
    .input_btn{
  width: 90vw;
  height: 42px;
  background-color: #e86e5a;
  color: black;

}
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
`;

const CadastrarEndereco = () => {
  const navigate = useNavigate();

  const [form, onChange, clear] = useForm({
    street: '',
    number: '',
    neighbourhood: '',
    city: '',
    state: '',
    complement: ''
  })

  const onSubmitForm = (event) => {
    event.preventDefault()
    console.log(form)
    clear()
  }

  const onSubmitEndereço = () => {
    const token = localStorage.getItem("token");

    axios
      .put(`${BASE_URL}/address`, form, {
        headers: {
          auth: token,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("Endereço já cadastrado para esse usuário")
      });
  }

  return (
    <CadastrarEnderecoContainer>
<HeaderCadastrarEndereco />

      {/* <button onClick={() => vaiParaEditarCadastro(navigate)}>Voltar</button> */}
      <form className="Conteudo" onSubmit={onSubmitForm}>
        <p>Meu Endereço</p>
      <TextField

className="input_text"
id="outlined-basic"
placeholder="Rua / Av."
label="Logradouro"
variant="outlined"
type={"text"}
value={form.street}
name={"street"}
onChange={onChange}
required
/>

<TextField

            className="input_text"
            id="outlined-basic"
            placeholder="Número"
            label="Número"
            variant="outlined"
            type={"number"}
            value={form.number}
            name={"number"}
            onChange={onChange}
            required
          />

          <TextField

            className="input_text"
            id="outlined-basic"
            placeholder="Complemento"
            label="Complemento"
            variant="outlined"
            value={form.complement}
            name={"complement"}
            onChange={onChange}
            required
          />

          <TextField

            className="input_text"
            id="outlined-basic"
            placeholder="Bairro"
            label="Bairro"
            variant="outlined"
            value={form.neighbourhood}
            name={"neighbourhood"}
            onChange={onChange}
            required

          />
          <TextField

            className="input_text"
            id="outlined-basic"
            placeholder="Cidade"
            label="Cidade"
            variant="outlined"
            value={form.city}
            name={"city"}
            onChange={onChange}
            required

          />
          <TextField

            className="input_text"
            id="outlined-basic"
            placeholder="Estado"
            label="Estado"
            variant="outlined"
            value={form.state}
            name={"state"}
            onChange={onChange}
            required

          />

          <Button className="input_btn" type={'submit'} onClick={onSubmitEndereço} disableElevation variant="contained">Salvar</Button>
        
      </form>
    </CadastrarEnderecoContainer>
  );
};

export default CadastrarEndereco;



