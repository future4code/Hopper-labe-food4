import React from "react";
import { useNavigate } from "react-router-dom";


const Cadastro = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Cadastro</h1>
        <button onClick={() => navigate("/")}>Enviar</button>
    </div>
  );
};

export default Cadastro;