import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaDetalhesRestaurante, vaiParaFeed, vaiParaPerfil } from "../Router/RouteFunctions";
import axios from "axios";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { GlobalContext } from "../Global/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import PopUp2 from "../Components/PopUpCarrinho/PopUpCarrinho"


export const Carrinho = () => {

  useProtectedPage();
  const { id } = useParams();
  const { states } = useContext(GlobalContext);
  const { carrinho } = states;
  const [loadingPost, setLoadingPost] = useState(false);
  const [erroPost, setErroPost] = useState('');
  const [pagamento, setPagamento] = useState([]);
  const [tempoPopUp2, setTempoPopUp2] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [restaurante] = useRequestData2(`${BASE_URL}/restaurants/${id}`)
  let rest = restaurante ? restaurante : "carregando"
  const carrinhoPost = carrinho && carrinho.map(({ id, quantity }) => ({ id, quantity }))
  const somaCarrinho = carrinho.map(item => item.precoTotalItem).reduce((prev, curr) => prev + curr, 0);
  const subTotal = (somaCarrinho + rest.shipping).toFixed(2);

  useEffect(() => {
    setaTempo();
  }, [])

  const setaTempo = (restaurante) => {
    setTimeout(() => {
      setTempoPopUp2(false)
    }, (rest.deliveryTime *1000))
  }
  const enviaPedido = () => {
    setLoadingPost(true)
    const body = {
      products: carrinhoPost,
      paymentMethod: pagamento
    }
    axios.post(`${BASE_URL}/restaurants/${id}/order`, body, {
      headers: {
        auth: token,
        contentType: "application/json"
      }
    }).then((response) => {
      setaTempo();
      setLoadingPost(false);
    }).catch(error => {
      setLoadingPost(false)
      setErroPost(error.response)
    });
  }

  const listaCarrinho = carrinho && carrinho.map((prato) => {
    return <div key={prato.id}>
      <p>quantidade {prato.quantity}</p>
      <img src={prato.photoUrl} width="75px" height="75px"></img>
      <p>{prato.name}</p>
      <p>{prato.description}</p>
      <p>{parseFloat(prato.precoTotalItem).toFixed(2)}</p>
    </div>
  });
  console.log(carrinho)
  return (
    <div>
      <h1>Carrinho</h1>
      <button onClick={() => vaiParaFeed(navigate)}>Feed</button>
      <button onClick={() => vaiParaPerfil(navigate)}>Perfil</button>
      <button onClick={() => vaiParaCarrinho(navigate)}>Carrinho</button>
      <br></br>

      <button onClick={() => vaiParaDetalhesRestaurante(navigate, id)}>Continuar Comprando</button>
      <br></br>

      {carrinho.length === 0 && <h3>Carrinho vazio</h3>}
      {carrinho.length === 0 ? "" :
        <div>
          <h4>{rest.name}</h4>
          <p>{rest.address}</p>
          <p>{`${rest.deliveryTime} min`}</p>
        </div>}

      <span>
        {listaCarrinho}
      </span>

      <div>{carrinho.length === 0 ? "" :
        <h3> {`Frete:R$ ${parseFloat(rest.shipping).toFixed(2)}`} </h3>}
        {carrinho.length === 0 ? <h3>SUBTOTAL 0,00</h3> : <h3>{`SUBTOTAL ${subTotal}`}</h3>}
        <h5>FORMA DE PAGAMENTO</h5>
        <input type="radio" name="pagamento" value={pagamento} onChange={() => setPagamento("money")} />Dinheiro
        <input type="radio" name="pagamento" value={pagamento} onChange={() => setPagamento("creditcard")} />Cartão de Crédito
        <button onClick={() => enviaPedido()}>Confirmar</button>
      </div>

      {loadingPost && loadingPost && <p>Carregando...</p>}
      {!loadingPost && erroPost && <p>Ja existe um pedido em andamento!</p>}
      {tempoPopUp2 ? <PopUp2 trigger={tempoPopUp2} setTrigger={setTempoPopUp2}>
        <p>Pedido em Andamento</p>
        <p>{rest.name}</p>
        <p>{subTotal}</p>
      </PopUp2> : ""}


    </div>
  );
};

