import React from "react";
import { useNavigate } from "react-router-dom";


const DetalhesRestaurante = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Restaurante</h1>
        <button onClick={() => navigate("/")}>Voltar</button>
        <br></br>
        <h3>Principais</h3>
        <button>Adicionar</button>

    </div>
  );
};

export default DetalhesRestaurante;