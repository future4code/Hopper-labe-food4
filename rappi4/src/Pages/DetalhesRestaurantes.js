import { useNavigate, useParams } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaFeed, vaiParaPerfil } from "../Router/RouteFunctions";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { useContext } from "react";
import { GlobalContext } from "../Global/GlobalContext";
import { HeaderRestaurant } from "../Constants/Headers/HeaderRestaurant";
import styled from "styled-components";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const DetalhesRestauranteContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  
  h2{
    font-size: 1.1rem;
  }

  footer {
  background-color: #fff;
  border-top: 1px solid #b8b8b8;
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

  img {
    margin: 3vw;
    max-width: 100%;
    max-height: 100%;
    width: 340px;
    height: 250px;
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
    height: 13vh;

    img{
      margin-top: 4vw;
      margin-left: 0px;
    }

    .btn__add_remove{
 display: flex;
 flex-direction: column;
 margin-right: 2vw;

 
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
    justify-content: space-between;
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
  const { addCarrinho, removeCarrinho, selecionaQuantidade } = dados;
  const [restaurante, loading, erro] = useRequestData2(
    `${BASE_URL}/restaurants/${id}`
  );
  let rest = restaurante ? restaurante : "carregando";
  const produtos = rest.products;

  console.log(id)

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
          onClick={() => vaiParaCarrinho(navigate, id)}
        />
      </footer>

    </DetalhesRestauranteContainer>
  );
};

export default DetalhesRestaurante;
