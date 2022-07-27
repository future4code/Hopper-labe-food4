import { useNavigate, useParams } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaFeed } from "../Router/RouteFunctions"
import { useProtectedPage } from "../Hooks/UseProtectPage"
import { useState, useContext } from "react";
import { GlobalContext } from "../Global/GlobalContext";

const DetalhesRestaurante = () => {

  useProtectedPage();

  const navigate = useNavigate();
  const { id } = useParams();
  const { states, dados } = useContext(GlobalContext);
  const { carrinho } = states;
  const { addCarrinho, removeCarrinho, selecionaQuantidade } = dados;
  const [restaurante, loading, erro] = useRequestData2(`${BASE_URL}/restaurants/${id}`)
  const token = localStorage.getItem("token");
  let rest = restaurante ? restaurante : "carregando"
  const produtos = rest.products;

  //ver ternário ou if/else pra deixar o botão de adicionar e remover renderizado condicionalmente!!

  const listaCardapio = produtos && produtos.map((prato) => {
    return (
      <div key={prato.id}>
        <img src={prato.photoUrl} width="75px" height="75px" />
        <p>{prato.name}</p>
        <p>{prato.description}</p>
        <p>{`R$: ${prato.price.toFixed(2)}`}</p>
        {selecionaQuantidade()}
        {/* {renderizaBotao} */}
        <button onClick={() => removeCarrinho(prato)}>remover</button>
        <p onClick={() => addCarrinho(prato)}>ADICIONAR AO CARRINHO</p>
      </div>
    )
  });

  console.log(carrinho)

  return (
    <div>
      <h1>Restaurante</h1>
      <button onClick={() => vaiParaFeed(navigate)}>Voltar</button>
      <button onClick={() => vaiParaCarrinho(navigate, rest.id)}>Carrinho</button>

      <br></br>

      <img src={rest.logoUrl} alt={rest.name} width="20%" />
      <h4>{rest.name}</h4>
      <p>{rest.category}</p>
      <p>{`${rest.deliveryTime} min`}</p><p>{`Frete: R$ ${rest.shipping}`}</p>
      <p>{rest.address}</p>

      {/* fazerfiltro para principais e acompanhamentos */}
      <br></br>
      <h3>Principais</h3>
      <br></br>
      <h3>Acompanhamentos</h3>

      {loading && loading && <p>Carregando...</p>}
      {!loading && erro && <p>Deu ruim!</p>}
      {!loading && rest.products && rest.products.length > 0 && listaCardapio}




    </div>
  );
};

export default DetalhesRestaurante;