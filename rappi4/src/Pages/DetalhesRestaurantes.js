import { useNavigate, useParams } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaFeed } from "../Router/RouteFunctions";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { useState, useContext } from "react";
import { GlobalContext } from "../Global/GlobalContext";
import { HeaderRestaurant } from "../Constants/Headers/HeaderRestaurant";
import styled from "styled-components";

const DetalhesRestauranteContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;

  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 17px;
    width: 90vw;
    height: 120px;
  }

  .Conteudo {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .RestaurantInfos {
    .timeAndFrete {
      display: flex;

      .time__ {
        margin-right: 30px;
      }
    }

    margin-top: 9px;

    display: flex;
    flex-direction: column;
    width: 90vw;
    align-items: flex-start;

    h4 {
      color: #e86e5a;
      font-weight: 600;
    }

    p {
      line-height: 22px;
      color: #b8b8b8;
    }
  }
  .CardProduct {
    border: 1px solid #b8b8b8;
    border-radius: 5px;
    width: 90vw;
    height: 112px;

    .btn__add_remove{
 display: flex;
 flex-direction: column;

    }
    #quantidade_count{
      input{
        background-color: red;
      }
      border: none;
      align-self: flex-end;
      outline-style: none;
      background-color: red;
    }

    .btn__pedido{
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;


      .add_btn{
        border: 1px solid white;
        outline-style: none;
        border-top-left-radius: 5px;
        padding: 5px;
        border-bottom-right-radius: 5px;
        background-color:#e86e5a;
      }
      .remove_btn{
        border: 1px solid grey;
        outline-style: none;
        border-top-left-radius: 5px;
        padding: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    .product__info {
h4{
  color: #e86e5a;
}

p{
  color: #b8b8b8;
}
    }

    display: flex;
    align-items: center;
    margin: 5px;

    .img_prato {
      display: flex;

      width: 150px;
      height: 150px;

      img {
        width: 100px;
        height: 76%;
      }
    }
  }
`;

const DetalhesRestaurante = () => {
  useProtectedPage();

  const navigate = useNavigate();
  const { id } = useParams();
  const { states, dados } = useContext(GlobalContext);
  const { carrinho } = states;
  const { addCarrinho, removeCarrinho, selecionaQuantidade } = dados;
  const [restaurante, loading, erro] = useRequestData2(
    `${BASE_URL}/restaurants/${id}`
  );
  let rest = restaurante ? restaurante : "carregando";
  const produtos = rest.products;

  const categorias = [
    ...new Map(
      produtos && produtos.map((item) => [item["category"], item])
    ).values(),
  ].map((categoria) => {
    return (
      <div key={categoria.id}>
        <h2>{categoria.category}</h2>
        {produtos
          .filter((cat) => {
            if (cat.category == categoria.category) {
              return cat;
            }
          })
          .map((prato) => {
            return (
              <div className="CardProduct" key={prato.id}>
                <div className="img_prato">
                  <img src={prato.photoUrl} />
                </div>

                <div className="product__info">
                  <h4>{prato.name}</h4>
                  <p>{prato.description}</p>
                  <h3>{`R$: ${parseFloat(prato.price).toFixed(2)}`}</h3>
                </div>

                <div className='btn__pedido'>

                  <div id='quantidade_count'>
                    {selecionaQuantidade()}
                  </div>

                <div className='btn__add_remove'>

                <button className='remove_btn' onClick={() => removeCarrinho(prato)}>remover</button>
                  <button className='add_btn' onClick={() => addCarrinho(prato)}>adicionar</button>

                </div>

                </div>
              </div>
            );
          })}
      </div>
    );
  });

  return (
    <DetalhesRestauranteContainer>
      <HeaderRestaurant />

      <div className="Conteudo">
        {/* 
        <button onClick={() => vaiParaFeed(navigate)}>Voltar</button>
        <button onClick={() => vaiParaCarrinho(navigate, rest.id)}>
          Carrinho
        </button> */}
        <div>
          <img src={rest.logoUrl} alt={rest.name} width="20%" />

          <div className="RestaurantInfos">
            <h4>{rest.name}</h4>
            <p>{rest.category}</p>
            <p>{`${rest.deliveryTime} min`}</p>
            <p>{`Frete: R$ ${rest.shipping}`}</p>
            <p>{rest.address}</p>
          </div>
        </div>

        {loading && loading && <p>Carregando...</p>}
        {!loading && erro && <p>Deu ruim!</p>}
        {!loading && rest.products && rest.products.length > 0 && categorias}
      </div>
    </DetalhesRestauranteContainer>
  );
};

export default DetalhesRestaurante;
