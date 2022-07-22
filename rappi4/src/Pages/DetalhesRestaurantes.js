import { useNavigate, useParams } from "react-router-dom";
import { useRequestData2 } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { vaiParaFeed } from "../Router/RouteFunctions"
import {useProtectedPage} from "../Hooks/UseProtectPage"
import { useState, useEffect } from "react";

const DetalhesRestaurante = () => {

  useProtectedPage();

  const navigate = useNavigate();
  const { id } = useParams();
  const [cardapio, loading, erro] = useRequestData2(`${BASE_URL}/restaurants/${id}`)
  const [contaVezes, setContaVezes] = useState(0)

  const soma = (preco) => {
    return (preco * contaVezes)
  }

  console.log(contaVezes)

  const somaUm = () =>{
    return setContaVezes(contaVezes +1)
  } 

  const DiminuiUm = () =>{
    return setContaVezes(contaVezes -1)
  } 

  const listaCardapio = cardapio && cardapio.map((prato) => {
    return (
      <div key={prato.id}>
        <img src={prato.photoUrl} width="75px" height="75px" />
        <p>{prato.name}</p>
        <p>{prato.description}</p>
        <p>{prato.price}</p>
        <button onClick={somaUm}>+</button>
        <button onClick={DiminuiUm}>remover</button>
        <p> {`Quantidade: ${contaVezes} R$: ${soma(prato.price)}`}  </p>
      </div>
    )
  });

// //pedido//

//    useEffect(() => { 
//     axios.post(`${BASE_URL}/restaurants/${id}/order`,{
//         headers: {
//           auth: token,
//           'Content-Type': 'application/json'
//         }
//       })
//     .then(response => {
//       setPedido(response.data.restaurants.products);
//     })
//     .catch(error => {
//       console.log(error.response.data)
//     });
//   }, []);

  return (
    <div>
      <h1>Restaurante</h1>
      <button onClick={() => vaiParaFeed(navigate)}>Voltar</button>
      <br></br>
      <h3>Principais</h3>
      <br></br>
      <h3>Acompanhamentos</h3>

      
      {loading && loading && <p>Carregando...</p>}
      {!loading && erro && <p>Deu ruim!</p>}
      {!loading && cardapio && cardapio.length > 0 && listaCardapio}
    

    </div>
  );
};

export default DetalhesRestaurante;