import React, { useContext, useState } from "react";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaDetalhesRestaurante, vaiParaFeed, vaiParaPerfil } from "../Router/RouteFunctions";
import axios from "axios";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { GlobalContext } from "../Global/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import Banner from 'react-js-banner'


export const Carrinho = () => {

  useProtectedPage();
  const { id } = useParams();
  const { states } = useContext(GlobalContext);
  const { carrinho } = states;
  const [loadingPost, setLoadingPost] = useState(false);
  const [erroPost, setErroPost] = useState('');
  const [pagamento, setPagamento] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [restaurante] = useRequestData2(`${BASE_URL}/restaurants/${id}`)

  let rest = restaurante ? restaurante : "carregando"
  const carrinhoPost = carrinho && carrinho.map(({ id, quantity }) => ({ id, quantity }))
  const somaCarrinho = carrinho.map(item => item.precoTotalItem).reduce((prev, curr) => prev + curr, 0);
  const subTotal = (somaCarrinho + rest.shipping).toFixed(2);

  const enviaPedido = () => {
    setLoadingPost(true)
    const body = {
      products: carrinhoPost,
      paymentMethod: pagamento
    }
    axios.post(`${BASE_URL}/restaurants/${id}/order`, body, {
      headers: {
        auth: token,
      }
    }).then(response => {
      setLoadingPost(false)
    }).catch(error => {
      setLoadingPost(false)
      setErroPost(error.response.data)
    });
  }

  const listaCarrinho = carrinho && carrinho.map((prato) => {
    return <div>
      <p>quantidade {prato.quantity}</p>
      <img src={prato.photoUrl} width="75px" height="75px"></img>
      <p>{prato.name}</p>
      <p>{prato.description}</p>
      <p>{prato.price}</p>
     </div>
  });

  console.log(`Total do carrinho ${somaCarrinho}`);
  console.log(`subtotal ${subTotal}`);
  console.log(carrinhoPost)
  console.log(pagamento)

  return (
    <div>
      <h1>Carrinho</h1>
      <button onClick={() => vaiParaFeed(navigate)}>Feed</button>
      <button onClick={() => vaiParaPerfil(navigate)}>Perfil</button>
      <button onClick={() => vaiParaCarrinho(navigate)}>Carrinho</button>
      <br></br>

      <button onClick={() => vaiParaDetalhesRestaurante(navigate, id)}>Continuar Comprando</button>
      <br></br>

      {/* //se carrinho ta vazio não deveria renderizar o restaurante, mas a requisição ta aqui// */}
      {carrinho && carrinho.length === 0 && <h3>Carrinho vazio</h3>}
      {carrinho.length === 0 ? "" :
        <div>
          <h4>{rest.name}</h4>
          <p>{rest.address}</p>
          <p>{`${rest.deliveryTime} min`}</p>
        </div>}

      <span>
        {listaCarrinho}
      </span>

      <div>
        <h3> {`Frete:R$ ${rest.shipping}`} </h3>
        <h3>{`SUBTOTAL ${subTotal}`}</h3>
        <h5>FORMA DE PAGAMENTO</h5>
        <input type="radio" name="pagamento" value={pagamento} onChange={() => setPagamento("money")} />Dinheiro
        <input type="radio" name="pagamento" value={pagamento} onChange={() => setPagamento("creditcart")} />Cartão de Crédito
        <button onClick={() => enviaPedido()}>Confirmar</button>
      </div>

      {loadingPost && loadingPost && <p>Carregando...</p>}
      {!loadingPost && erroPost && <p>Deu ruim!</p>}

      {/* ta certo esse banner, qual o ternário pra ir pra feed e renderizar banner?? */}

      {/* { vaiParaFeed(navigate) &&
        <Banner visibleTime={rest.deliveryTime}>
          <div>
            <h3>Pedido em andamento</h3>
            <p>{rest.name}</p>
            <p>{`SUBTOTAL R$ ${subTotal}`}</p>
          </div>
        </Banner>
      } */}

    </div>
  );
};

