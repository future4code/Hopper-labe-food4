import React from "react";
import { useNavigate } from "react-router-dom";
import { vaiParaPerfil } from "../Router/RouteFunctions";
import useForm from "../Hooks/UseForm"
import axios from 'axios';
import { BASE_URL } from "../Constants/urls"
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { Button, TextField } from "@mui/material";
import { AlterarEnderecoContainer } from "../Styles/EditarEnderecoStyled";
import { HeaderEditarEndereco } from "../Constants/Headers/HeaderEditarEndereco";

const CadastrarEndereco = () => {
  const navigate = useNavigate();
  useProtectedPage()
  

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
        navigate("/perfil");
      })
      .catch((err) => {
        console.log(err.response.token);
        console.log(err.response.data);
      });
  }

  return (
    
    <AlterarEnderecoContainer>

      <div className="Conteudo">
      <HeaderEditarEndereco />
      
        <form className="Conteudo" onSubmit={onSubmitForm}>

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
      </div>

      
    </AlterarEnderecoContainer>
  )

  }

export default CadastrarEndereco