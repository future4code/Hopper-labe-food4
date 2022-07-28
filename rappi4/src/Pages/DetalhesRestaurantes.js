import { useNavigate, useParams } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaFeed } from "../Router/RouteFunctions"
import { useProtectedPage } from "../Hooks/UseProtectPage"
import { useState, useContext } from "react";
import { GlobalContext } from "../Global/GlobalContext";
import PopUp1 from "../Components/PopUpDetalhesRest/PopUpDet";

const DetalhesRestaurante = () => {

  useProtectedPage();

  const navigate = useNavigate();
  const { id } = useParams();
  const { states, dados } = useContext(GlobalContext);
  const { carrinho } = states;
  const { addCarrinho, removeCarrinho, selecionaQuantidade } = dados;
  const [restaurante, loading, erro] = useRequestData2(`${BASE_URL}/restaurants/${id}`);
  const [quantidadePrato, setQuantidadePrato] = useState()
  const [popUp1, setPopUp1] = useState(false);
  const token = localStorage.getItem("token");
  let rest = restaurante ? restaurante : "carregando";
  const produtos = rest.products;

 
  const listaCardapio = produtos && produtos.map((prato) => {
    return (<div key={prato.id}>
        <img src={prato.photoUrl} width="75px" height="75px" />
        <p>{prato.name}</p>
        <p>{prato.description}</p>
        <p>{`R$: ${parseFloat(prato.price).toFixed(2)}`}</p>
         <p>{`quantidade ${prato.quantity}`}</p> 
        {/*///definir como faz, mas não fica no map, pe ele recebe a info depois, ver se faz um estado!*/}
        {selecionaQuantidade()}
        <p onClick={() => addCarrinho(prato)}>ADICIONAR AO CARRINHO</p>
        <button onClick={() => removeCarrinho(prato)}>remover</button>
      </div>
      )
      // .filter((prato) => {
      //   return prato.category === "Bebida" &&
      //   prato.category === "Acompanhamento" &&
      //   prato.category === "Outros"
      // });
  })

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
        <p>{`${rest.deliveryTime} min`}</p><p>{`Frete: R$ ${parseFloat(rest.shipping).toFixed(2)}`}</p>
        <p>{rest.address}</p>

        {/* fazerfiltro para principais e acompanhamentos */}
        <br></br>
        <h3>Principais</h3>

        <br></br>
        <h3>Acompanhamentos</h3>
        {/* {produtos.category.filter(categoria => {
          return categoria === "Bebidas",
            categoria === "Acompanhamentos",
            categoria === "Outros"
        })} */}

        {loading && loading && <p>Carregando...</p>}
        {!loading && erro && <p>Deu ruim!</p>}
        {!loading && rest.products && rest.products.length > 0 && listaCardapio}

        {/* <button onClick={()=> setPopUp(true)}>ADICIONAR AO CARRINHO</button>

      <PopUp trigger={popUp} setTrigger={setPopUp}>
      {selecionaQuantidade()}
        <button onClick={()=> addCarrinho()}>adicionar</button>
        <h3>Olá</h3>
      </PopUp> */}



      </div>
      );
};

      export default DetalhesRestaurante;


      //botões de POPUP

      {/* <button onClick={() => setPopUp1(true)}>adicionar</button> */}
      {/* {popUp1 ? <PopUp1 trigger={popUp1} setTrigger={setPopUp1}>
          {selecionaQuantidade()}
          <p onClick={() => addCarrinho(prato)}>ADICIONAR AO CARRINHO</p>
        </PopUp1> : ""} */}