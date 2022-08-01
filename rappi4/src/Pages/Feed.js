import React, { useEffect, useState } from "react";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { useNavigate } from "react-router-dom";
import {
  
  vaiParaCarrinho,
  vaiParaDetalhesRestaurante,
  vaiParaFeed,

  vaiParaPerfil,
} from "../Router/RouteFunctions";
import { useRequestData } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { render } from "@testing-library/react";

import { HeaderFeed } from "../Constants/Headers/HeaderFeed";
import SearchIcon from "@mui/icons-material/Search";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FeedContainer } from "../Styles/FeedStyled";



const Feed = () => {
  useProtectedPage()
  const navigate = useNavigate();
  const [data, loading, erro] = useRequestData(`${BASE_URL}/restaurants`);
  const [categoriaExibida, setCategoriaExibida] = useState();
  const [busca, setBusca] = useState("");

  let restaurantes = !!data ? data : "carregando";

  const listaRestaurantes =
    restaurantes.restaurants &&
    restaurantes.restaurants
      .filter((val) => {
        if (busca == "") {
          return val;
        } else if (val.name.toLowerCase().includes(busca.toLocaleLowerCase())) {
          return val;
        }
      })
      .map((rest) => {
        if (categoriaExibida === rest.category) {
          return (
            <div className='CardProduct' key={rest.id}>
              <img
                onClick={() => vaiParaDetalhesRestaurante(navigate, rest.id)}
                src={rest.logoUrl}
                width="1300px"
              />
              <h3>{rest.name}</h3>
              <p>{`${rest.deliveryTime} - ${rest.deliveryTime + 10} min`}</p>
              <p>{`Frete R$${rest.shipping},00`}</p>
            </div>
          );
        } else if (!categoriaExibida) {
          return (
            <div className="CardProduct" key={rest.id}>
              <img
                onClick={() => vaiParaDetalhesRestaurante(navigate, rest.id)}
                src={rest.logoUrl}
                width="300px"
              />
              <div></div>

              <div className="infos_container">
                <div className="rest_name">
                  {" "}
                  <h3>{rest.name}</h3>
                </div>

                <div className="rest_infos">
                  <p>{`${rest.deliveryTime} - ${
                    rest.deliveryTime + 10
                  } min`}</p>
                  <p>{`Frete R$${rest.shipping},00`}</p>
                </div>
              </div>
            </div>
          );
        }
      });

  const escolheCategoria = (escolha) => {
    categoriaExibida === escolha
      ? setCategoriaExibida()
      : setCategoriaExibida(escolha);
  };

  const categoriaDeRestaurantes = [
    ...new Map(
      restaurantes.restaurants &&
        restaurantes.restaurants.map((item) => [item["category"], item])
    ).values(),
  ].map((rest) => {
    return (
      <div key={rest.id}>
        <button onClick={() => escolheCategoria(rest.category)}>
          {rest.category}
        </button>
      </div>
    );
  });

  return (
    <FeedContainer>
      <HeaderFeed />

      <div className="Conteudo">
        <div className="busca">
          <SearchIcon sx={{ color: "#b8b8b8" }} className="pesquisa" />
          <input
            type="text"
            placeholder="Restaurante"
            onChange={(event) => {
              setBusca(event.target.value);
            }}
          ></input>
        </div>

        <div className="atalhos-Restaurantes">{categoriaDeRestaurantes}</div>

        {/* 
        <button onClick={() => vaiParaLogin(navigate)}>Login</button>
        <button onClick={() => vaiParaCadastro(navigate)}>Cadastro</button> */}

        {loading && loading && <p>Carregando...</p>}
        {!loading && erro && <p>Deu ruim!</p>}
        {!loading &&
          restaurantes.restaurants &&
          restaurantes.restaurants.length > 0 &&
          listaRestaurantes}
      </div>
      <footer>
        <PersonPinIcon
          sx={{ fontSize: 35, color: "#b8b8b8" }}
          id="profile"
          onClick={() => vaiParaPerfil(navigate)}
        />
        <HomeIcon
          sx={{ fontSize: 35, color: "#b8b8b8" }}
          id="home"
          onClick={() => vaiParaFeed(navigate)}
        />
        <ShoppingCartIcon
          sx={{ fontSize: 35, color: "#b8b8b8" }}
          id="cart"
          onClick={() => vaiParaCarrinho(navigate)}
        />
      </footer>
    </FeedContainer>
  );
};

export default Feed;
