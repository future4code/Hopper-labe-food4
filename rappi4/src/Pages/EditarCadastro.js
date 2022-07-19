import React from "react";
import { useNavigate } from "react-router-dom";


const EditarCadastro = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Editar Cadastro</h1>
        <button onClick={() => navigate("/perfil")}>Voltar</button>
        <button>Salvar</button>
    </div>
  );
};

export default EditarCadastro;