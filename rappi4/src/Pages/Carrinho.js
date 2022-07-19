import React from "react";
import { useNavigate } from "react-router-dom";


const Carrinho = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Carrinho</h1>
        <button onClick={() => navigate("/")}>Feed</button>
        <button onClick={() => navigate("/perfil")}>Perfil</button>
        <button onClick={() => navigate("/carrinho")}>Carrinho</button>
        <br></br>
        <button>Confirmar</button>

    </div>
  );
};

export default Carrinho;