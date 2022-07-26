import React, { useEffect, useContext, useState } from "react";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaFeed, vaiParaPerfil } from "../Router/RouteFunctions";
import axios from "axios";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { GlobalContext } from "../Global/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";


export const Carrinho = () => {

  useProtectedPage();
  const { id } = useParams();
  const { states } = useContext(GlobalContext);
  const { carrinho, restaurante, loading, erro } = states;
  const [erro1, setErro1] = useState('')
  const [payment, setPayment] = useState("")
  const [moneyCheck, setMoneyCheck] = useState(false)
  const [cardCheck, setCardCheck] = useState(false)
  const token = localStorage.getItem("token");
  let rest = restaurante ? restaurante : "carregando"
  const produtos = rest.products;
  const navigate = useNavigate();

  const carrinhoPost = carrinho && carrinho.map(({ id, quantity }) => ({ id, quantity }))

  const somaCarrinho = carrinho.map(item => item.precoTotalItem).reduce((prev, curr) => prev + curr, 0);

  console.log(`Total do carrinho ${somaCarrinho}`);

  useEffect(() => {

    const body = {
      products: carrinhoPost,
      "paymentMethod": "creditcard"
    }

    axios.post(`${BASE_URL}/restaurants/${id}/order`, body, {
      headers: {
        auth: token,
      }
    })
      .catch(error => {
        setErro1(error.response.data)
      });
  }, []);

  const dinheiro = "money"
  const cartao = "creditcard"

  const update = () => {

  }

  const aux = () => {
    setCardCheck(false)
    setMoneyCheck(true)
    setPayment(dinheiro)
    update()

  }

  const aux2 = () => {
    setCardCheck(true)
    setMoneyCheck(false)
    setPayment(cartao)
    update()

  }


  return (
    <div>
  <h1>Carrinho</h1>
  <button onClick={() => vaiParaFeed(navigate)}>Feed</button>
 <button onClick={() => vaiParaPerfil(navigate)}>Perfil</button>
 <button onClick={() => vaiParaCarrinho(navigate)}>Carrinho</button>
  <br></br>
 <button>Confirmar</button>
 {/* <button onClick={()=>goToDetailPage(navigate)}>Continuar Comprando</button> */}

 {/* {endereço da entrega no topo da página, vem do endereço inserido do cliente} */}
    {/* {listaCarrinho} 
   endereço do lugar
    tempo de entrega 30 - 45 min
   card com o que foi pedido
     */}
   {/* {Preço total da compra}  preço frete+
      preço total*/}
      {/* {selecionar forma de pagamento} */}
     {/* {concluir o pedido e exibir um banner de andamento (pedido fica ativo por x minutos, sendo x o tempo de entrega} */}


   {/* //loading// */}
      {/* {loading && loading && <p>Carregando...</p>}
    {!loading && erro && <p>Deu ruim!</p>}
      {!loading && pedidos && pedidos.length > 0 && historicoPedidos}
    {!loading && pedidos && pedidos.length === 0 && <h3>Carrinho vazio</h3>}  */}
    <div>
     {moneyCheck ? <span onClick={() => aux()}> Dinheiro </span> : <span onClick={() => aux()}> Dinheiro </span>}
  </div>
   <div>
      {cardCheck ? <span onClick={() => aux2()}> Cartão de credito </span> : <span onClick={() => aux2()}> Cartão de credito </span>}
   </div> 
    </div>
  );
};

// export default Carrinho;

// const [loading2, setLoading2] = useState(false);
// const [erro2, setErro2] = useState("");
// const token = localStorage.getItem("token");



{/* {loading2 && loading2 && <p>Carregando...</p>}
      {!loading2 && erro2 && <p>Deu ruim!</p>} */}