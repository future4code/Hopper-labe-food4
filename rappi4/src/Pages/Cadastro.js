import React from "react";
import { useNavigate } from "react-router-dom";
import { vaiParaFeed } from "../Router/RouteFunctions";


const Cadastro = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Cadastro</h1>
        <button onClick={() => vaiParaFeed(navigate)}>Enviar</button>
    </div>
  );
};

export default Cadastro;