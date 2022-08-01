import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {vaiParaCadastro, vaiParaCarrinho, vaiParaDetalhesRestaurante, vaiParaFeed, vaiParaLogin, vaiParaPerfil} from "../Router/RouteFunctions"
import { useRequestData } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { render } from "@testing-library/react";
import { useProtectedPage } from "../Hooks/UseProtectPage";



const Feed = () => {
  useProtectedPage()
  const navigate = useNavigate();
  const [data, loading, erro] = useRequestData(`${BASE_URL}/restaurants`)
  const [categoriaExibida, setCategoriaExibida] = useState();
  const [busca, setBusca] = useState('');

  let restaurantes = !!data? data : "carregando"
  
  const listaRestaurantes = restaurantes.restaurants && restaurantes.restaurants.filter((val) => {
    if (busca == ''){
      return val
    } else if (val.name.toLowerCase().includes(busca.toLocaleLowerCase())){
      return val
    }}).map((rest) => {
      if(categoriaExibida === rest.category){
        return <div key={rest.id}>
          <img onClick={() => vaiParaDetalhesRestaurante(navigate, rest.id)}
            src={rest.logoUrl}
            width="300px" />
          <h3>{rest.name}</h3>
          <p>{`${rest.deliveryTime} - ${rest.deliveryTime + 10} min`}</p>
          <p>{`Frete R$${rest.shipping},00`}</p>
        </div>
      } else if(!categoriaExibida){
        return <div key={rest.id}>
          <img onClick={() => vaiParaDetalhesRestaurante(navigate, rest.id)}
            src={rest.logoUrl}
            width="300px" />
          <h3>{rest.name}</h3>
          <p>{`${rest.deliveryTime} - ${rest.deliveryTime + 10} min`}</p>
          <p>{`Frete R$${rest.shipping},00`}</p>
        </div> 
      }  
  });
  
  const escolheCategoria = (escolha) => {
    categoriaExibida === escolha ? setCategoriaExibida() : setCategoriaExibida(escolha)
  }

  const categoriaDeRestaurantes = ([...new Map(restaurantes.restaurants && restaurantes.restaurants.map(item =>[item["category"], item])).values()]).map((rest) => {
    return <div key={rest.id}>
      <button onClick={()=>escolheCategoria(rest.category)}>{rest.category}</button>    
    </div>})


  return (
    <div>

      <h1>Feed</h1>
      <button onClick={() => vaiParaLogin(navigate)}>Login</button>
      <button onClick={() => vaiParaCadastro(navigate)}>Cadastro</button>
      <br></br>
      <button onClick={() => vaiParaFeed(navigate)}>Feed</button>
      <button onClick={() => vaiParaPerfil(navigate)}>Perfil</button>
      <button onClick={() => vaiParaCarrinho(navigate)}>Carrinho</button>
      <br></br>
      <input type="text" placeholder="Busca..." onChange={event => {setBusca(event.target.value)}}></input>
      <br></br>
      {categoriaDeRestaurantes}
      <br></br>

      {loading && loading && <p>Carregando...</p>}
      {!loading && erro && <p>Deu ruim!</p>}
      {!loading && restaurantes.restaurants && restaurantes.restaurants.length > 0 && listaRestaurantes}

    </div>
  );
}

export default Feed;