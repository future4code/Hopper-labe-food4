import React from "react";
import { useNavigate } from "react-router-dom";
import {vaiParaCadastro, vaiParaCarrinho, vaiParaDetalhesRestaurante, vaiParaFeed, vaiParaLogin, vaiParaPerfil} from "../Router/RouteFunctions"
import { useRequestData } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";


const Feed = () => {
  const navigate = useNavigate();
  const [restaurantes, loading, erro] = useRequestData(`${BASE_URL}/restaurants`)

    console.log(restaurantes)
  
  const listaRestaurantes = restaurantes && restaurantes.map((rest) => {
    return <div key={rest.id}>
      <img onClick={() => vaiParaDetalhesRestaurante(navigate, rest.id)}
        src={rest.logoUrl}
        width="300px" />
      <h3>{rest.name}</h3>
    </div>
  });

  return (
    <div>
      <h1>Feed</h1>
      <button onClick={() => vaiParaLogin(navigate)}>Login</button>
      <button onClick={() => vaiParaCadastro(navigate)}>Cadastro</button>
      <br></br>
      <button onClick={() => vaiParaFeed(navigate)}>Feed</button>
      <button onClick={() => vaiParaPerfil(navigate)}>Perfil</button>
      <button onClick={() => vaiParaCarrinho(navigate)}>Carrinho</button>

      {loading && loading && <p>Carregando...</p>}
      {!loading && erro && <p>Deu ruim!</p>}
      {!loading && restaurantes && restaurantes.length > 0 && listaRestaurantes}

    </div>
  );
}

export default Feed;