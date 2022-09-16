import React, { useContext, useState } from "react";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaDetalhesRestaurante, vaiParaFeed, vaiParaPerfil } from "../Router/RouteFunctions";
import axios from "axios";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { GlobalContext } from "../Global/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import { useRequestData2, useRequestData } from "../Hooks/useRequestData";
import PopUp2 from "../Components/PopUpCarrinho/PopUpCarrinho"
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "styled-components";
import { HeaderCarrinho } from "../Constants/Headers/HeaderCarrinho";
import { Button, TextField } from "@mui/material";

const CarrinhoContainer = styled.div`

  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .Conteudo {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

.CarrinhoCheio{
  border: 1px solid grey;
  border-radius: 5px;
  width: 90vw;

  img{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    height: 120px;
  }
p{
  padding-left: 10px;
  color: #b8b8b8;
}

h4{
  padding-left: 10px;
}


h3{
  padding-left: 10px;
  padding-bottom: 10px;
}
}
    .title_carrinho{

margin-bottom: 33px;
margin-top: 20px;

    }

    .end_entrega{
      width: 100%;
      background-color: #eeeeee;
      display: flex;
      flex-direction: column;
      height: 76px;
      align-items: flex-start;
      justify-content: center;
      p{
        margin-left: 20px;
        color: #b8b8b8;
      }

      h4{
        margin-left: 20px;
      }
    }

    .info_pedido{
      width: 90%;

    }

    .subtotal_info{
      display: flex;
      justify-content: space-between;
    }

    .formaDePagamento{
      display: flex;
      flex-direction: column;
      margin-top: 25px;
      align-items: flex-start;

      h5{
        border-bottom: 1px solid black;
        margin-bottom: 12px;
        width: 100%;

      }
      
      .money_card{
          display: flex;
          flex-direction: column;
          input{
            margin-right: 10px;
          }
        }
    }
  }

.input_btn{
  margin-bottom: 40px;
  margin-top: 10px;
  width: 90vw;
  height: 42px;
  background-color: #e86e5a;
  color: black;

 
}
  
  footer {
    background-color: #fff;
    border-top: 1px solid #b8b8b8; ;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    height: 49px;
    width: 100%;
    position: fixed;
    bottom: 0;

    #profile {
      svg {
        width: 80px;
      }
    }

  }
`;
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
  const [restaurante] = useRequestData2(`${BASE_URL}/restaurants/${id}`);
  let rest = restaurante ? restaurante : "carregando";
  const carrinhoPost = carrinho && carrinho.map(({ id, quantity }) => ({ id, quantity }));
  const somaCarrinho = carrinho.map(item => item.precoTotalItem).reduce((prev, curr) => prev + curr, 0);
  const subTotal = (somaCarrinho + rest.shipping).toFixed(2);
  const [enderecos] = useRequestData(`${BASE_URL}/profile/address`);
  let end = !!enderecos ? enderecos : "carregando";
  let endereco = !!end.address ? end.address : "carregando";

  const setaTempo = () => {
    setTempoPopUp2(!tempoPopUp2)
    setTimeout(() => {
    }, (rest.deliveryTime * 60000))
    setTempoPopUp2(!tempoPopUp2)
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

    return <div className='CarrinhoCheio' key={prato.id}>

      <img src={prato.photoUrl} alt={prato.name}></img>
      


      <h4>{prato.name}</h4> 
       <p>{prato.description}</p>

      {/* <p>quantidade:  {prato.quantity}</p> */}

      <h3>{`R$: ${parseFloat(prato.precoTotalItem).toFixed(2)}`}</h3>

    </div>
  });

  return (
    <CarrinhoContainer>
      <div className='Conteudo'>
        <HeaderCarrinho />
        <button onClick={() => vaiParaDetalhesRestaurante(navigate, id)}>Continuar Comprando</button>

        <div className='end_entrega'>

          <p> Endereço de entrega</p>
          <h4>{`${endereco.street}, ${endereco.number}`}</h4>

        </div>

        {carrinho.length === 0 && <h3 className='title_carrinho'>Carrinho vazio</h3>}
        {carrinho.length > 0 &&
          <div>
            <h4>{rest.name}</h4>
            <p>{rest.address}</p>
            <p>{`${rest.deliveryTime} min`}</p>
          </div>}

        <span>
          {listaCarrinho}
        </span>

        <div className='info_pedido'>{carrinho.length === 0 ? "" :

          <h3> {`Frete R$: ${parseFloat(rest.shipping).toFixed(2)}`} </h3>}

          {carrinho.length === 0 ? <div className='subtotal_info'> <h3>SUBTOTAL</h3> <h3>R$ 00,00</h3> </div> : <h3>{`SUBTOTAL R$: ${subTotal}`}</h3>}
         <div className='formaDePagamento'>

         <h5>FORMA DE PAGAMENTO</h5>

         <div className='money_card'>
            <label>
            <input type="radio" name="pagamento" value={pagamento} onChange={() => setPagamento("money")} />Dinheiro
            </label>
<label>
<input type="radio" name="pagamento" value={pagamento} onChange={() => setPagamento("creditcard")} />Cartão de Crédito
</label>

         </div>
         <Button className="input_btn" onClick={() => enviaPedido()} disableElevation variant="contained">Confirmar</Button>
         </div>
         
        </div>

        {loadingPost && loadingPost && <p>Carregando...</p>}
        {!loadingPost && erroPost && <p>Ja existe um pedido em andamento!</p>}
        {tempoPopUp2 &&
          (<PopUp2 trigger={tempoPopUp2} setTrigger={setTempoPopUp2}>
            <div>
              <p>Pedido em Andamento</p>
              <p>{rest.name}</p>
              <p>{`Subtotal R$ ${subTotal}`}</p>
            </div>


          </PopUp2>)}
          
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
      </div>

    </CarrinhoContainer>
  );
};

