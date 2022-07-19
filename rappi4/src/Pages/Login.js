import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Login</h1>
        <button onClick={() => navigate("/")}>Entrar</button>
        <button onClick={() => navigate("/cadastro")}>Cadastro</button>
    </div>
  );
};

export default Home;