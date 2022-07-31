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
  const [popUp1, setPopUp1] = useState(false);
  const token = localStorage.getItem("token");
  let rest = restaurante ? restaurante : "carregando";
  const produtos = rest.products;
  

  
  const categorias = ([...new Map(produtos && produtos.map(item =>[item["category"], item])).values()]).map((categoria) => {
    return <div key={categoria.id}>
      <h2>{categoria.category}</h2>
      {produtos.filter((cat) => {if (cat.category == categoria.category){return cat}}).map((prato) => {
        return (
          <div key={prato.id}>
            <img src={prato.photoUrl} width="75px" height="75px"/>
            <p>{prato.name}</p>
            <p>{prato.description}</p>
            <p>{`R$: ${prato.price.toFixed(2)}`}</p>
            <button onClick={()=> setPopUp1(true)}>ADICIONAR AO CARRINHO</button>
            {popUp1 ? <PopUp1 trigger={popUp1} setTrigger={setPopUp1}>
            <button onClick={()=> addCarrinho(prato)}>adicionar</button>
            {selecionaQuantidade()}</PopUp1> : ""}
          </div>
        )
      })}
    </div>})
  
  

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

      {loading && loading && <p>Carregando...</p>}
      {!loading && erro && <p>Deu ruim!</p>}
      {!loading && rest.products && rest.products.length > 0 && categorias}

    </div>
  );
};

export default DetalhesRestaurante;