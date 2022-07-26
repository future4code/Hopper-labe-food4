import { useNavigate, useParams } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { vaiParaCarrinho, vaiParaFeed } from "../Router/RouteFunctions"
import { useProtectedPage } from "../Hooks/UseProtectPage"
import { useState, useEffect } from "react";


const DetalhesRestaurante = () => {

  useProtectedPage();

  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurante, loading, erro] = useRequestData2(`${BASE_URL}/restaurants/${id}`)
  const [quantidade, setQuantidade] = useState(0);
  // const [produto, setProduto] = useState("")
  const [carrinho, setCarrinho] = useState([]);

  let rest = restaurante ? restaurante : "carregando"

  const produtos = rest.products 

  console.log (produtos)

    const addCarrinho = (produtos) => {
    const index = carrinho.findIndex((produtoCarrinho) => {
      if (produtoCarrinho.id === produtos.id) {
        return true;
      } else {
        return false;
      }
    });

    if (index === -1){
      const produtoComQuantidade = {
        ...produtos, quantidade: 1, precoTotalItem: quantidade * produtos.price
      };
    const copiaCarrinho = [...carrinho, produtoComQuantidade];
    setCarrinho(copiaCarrinho);
  } else {
    return produtos
  }
};



const removeCarrinho = (item) => {
  const carrinhoAtualizado = carrinho.map((produto) => {
    if (produto.id === item.id) {
      return {
        ...produto, quantidade: quantidade - quantidade, precoTotalItem: quantidade * item.price
      }
    }
    return produto;
  })
    .filter((produto) => produto.quantidade > 0)
  setCarrinho(carrinhoAtualizado)
}


const somaTotal = carrinho.map(item => item.precoTotalItem).reduce((prev, curr) => prev + curr, 0);

console.log(`Total do carrinho ${somaTotal}`);

const selecionaQuantidade = () => {
  return (
    <div>
      <select onChange={(e) => setQuantidade(e.target.value)}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
  )
}

const listaCardapio = rest.products && rest.products.map((prato) => {
  return (
    <div key={prato.id}>
      <img src={prato.photoUrl} width="75px" height="75px" />
      <p>{prato.name}</p>
      <p>{prato.description}</p>
      <p>{prato.price}</p>
      <p>{prato.category}</p>
      {selecionaQuantidade()}
      <p onClick={() => addCarrinho(prato)}>ADICIONAR AO CARRINHO</p>
      <button onClick={() => removeCarrinho(prato)}>remover</button>

      {/* {quantidade > 0 ?
          (mostraBotaoRemover, quantidade) : mostraBotaoAdicionar}
        {mostraBotaoRemover? selecionaQuantidade : ""} */}
      {/* <p> {soma(prato.price)}  </p> */}

    </div>
  )
});

return (
  <div>
    <h1>Restaurante</h1>
    <button onClick={() => vaiParaFeed(navigate)}>Voltar</button>
    <br></br>

    <img src={rest.logoUrl} alt={rest.name} width="20%" />
    <h4>{rest.name}</h4>
    <p>{rest.category}</p>
    <p>{rest.deliveryTime}min</p><p>Frete: R${rest.shipping},00</p>
    <p>{rest.address}</p>

    <br></br>
    <h3>Principais</h3>
    {/* {pricipais} */}
    <br></br>
    <h3>Acompanhamentos</h3>
    {/* {acompanhamentos} */}


    {loading && loading && <p>Carregando...</p>}
    {!loading && erro && <p>Deu ruim!</p>}
    {!loading && rest.products && rest.products.length > 0 && listaCardapio}



  </div>
);
};

export default DetalhesRestaurante;



// //pedido//

// const [loading2, setLoading2] = useState(false);
// const [erro2, setErro2] = useState("");
// const token = localStorage.getItem("token");

// useEffect(() => {
//   fazPedido()
// }, [])

// const fazPedido = () => {
//   setLoading2(true);

//   const body = {
//     "products": [{
//       id: "CnKdjU6CyKakQDGHzNln",
//       quantity: contaVezes,
//     }, {
//       quantity: contaVezes,
//       id: "KJqMl2DxeShkSBevKVre"
//     }],
//     paymentMethod: pagamento,
//   }
//   axios.post(`${BASE_URL}/restaurants/${id}/order`, body {
//     headers: {
//       auth: token,
//     }
//   })
//     .then(() => {
//       setLoading2(false);
//     })
//     .catch(error => {
//       setErro2(error.response);
//       setLoading2(false);
//     });
// };


{/* {loading2 && loading2 && <p>Carregando...</p>}
      {!loading2 && erro2 && <p>Deu ruim!</p>} */}
