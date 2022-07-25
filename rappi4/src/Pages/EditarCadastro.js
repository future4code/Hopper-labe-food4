import React from "react";
import { useNavigate } from "react-router-dom";
import { vaiParaPerfil } from "../Router/RouteFunctions";

const EditarCadastro = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Editar Cadastro</h1>
        <button onClick={() => vaiParaPerfil(navigate)}>Voltar</button>
        <button>Salvar</button>
    </div>
  );
};

export default EditarCadastro;