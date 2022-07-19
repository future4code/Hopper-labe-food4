import React from "react";
import { useNavigate } from "react-router-dom";


const EditarEndereco = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Editar Endereço</h1>
        <button onClick={() => navigate("/perfil")}>Voltar</button>
        <button>Salvar</button>
    </div>
  );
};

export default EditarEndereco;