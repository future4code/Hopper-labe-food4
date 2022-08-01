import React from "react";
import { useNavigate } from "react-router-dom";
import { vaiParaPerfil } from "../Router/RouteFunctions";
import useForm from "../Hooks/UseForm"
import axios from 'axios';
import { BASE_URL } from "../Constants/urls"
import { useProtectedPage } from "../Hooks/UseProtectPage";

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
        console.log(err.response.data);
      });
  }

  return (
    <div>
      <h1>Endereço</h1>
      <form onSubmit={onSubmitForm}>
        <input
          value={form.street}
          name={'street'}
          onChange={onChange}
          placeholder="Logradouro"
          required
        />
        <input
          value={form.number}
          name={'number'}
          onChange={onChange}
          placeholder="Número"
          required
          type={"number"}
        />
        <input
          value={form.complement}
          name={'complement'}
          onChange={onChange}
          placeholder="Complemento"
        />
        <input
          value={form.neighbourhood}
          name={'neighbourhood'}
          onChange={onChange}
          placeholder="Bairro"
          required
        />
        <input
          value={form.city}
          name={'city'}
          onChange={onChange}
          placeholder="Cidade"
          required
        />
        <input
          value={form.state}
          name={'state'}
          onChange={onChange}
          placeholder="Estado"
          required
        />

        <button
          onClick={onSubmitEndereço}
          type={"submit"}>

          Salvar

        </button>
        <button onClick={() => vaiParaPerfil(navigate)}>Voltar</button>
      </form>
    </div>
  );
};

export default CadastrarEndereco;