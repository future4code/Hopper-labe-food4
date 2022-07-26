import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";



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

    </div>
    
  );
};

export default Cadastro;