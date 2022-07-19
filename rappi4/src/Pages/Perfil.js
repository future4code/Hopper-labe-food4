import React from "react";
import { useNavigate } from "react-router-dom";


const Perfil = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Meu Perfil</h1>
        <button onClick={() => navigate("/")}>Feed</button>
        <button onClick={() => navigate("/perfil")}>Perfil</button>
        <button onClick={() => navigate("/carrinho")}>Carrinho</button>
        <br></br>
        <button onClick={() => navigate("/editarCadastro")}>Editar Cadastro</button>
        <button onClick={() => navigate("/editarEndereco")}>Editar Endereço</button>

        <h3>Historico de Pedidos:</h3>
    </div>
  );
};

export default Perfil;