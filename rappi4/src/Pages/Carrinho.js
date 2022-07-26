import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/urls";
import { useRequestData } from "../Hooks/useRequestData";
import { vaiParaCarrinho, vaiParaFeed, vaiParaPerfil } from "../Router/RouteFunctions";


const Carrinho = () => {

  // useProtectedPage();  desbloquear para testar

  const navigate = useNavigate();
  const { id } = useParams
  

 

  //get order//

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/active-order`, {
  //     headers: {
  //       auth: token
  //     }
  //   }).then((res) => {
  //     console.log(res.data)
  //   }).catch((err) => {

  //   })
  // }, [])

  //fazer pedido//

  
  // useEffect(() => { 
  //   axios.post(`${BASE_URL}/restaurants/${id}/order`,{
  //       headers: {
  //         auth: token,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //   .then(response => {
  //     setPedido(response.data.restaurants.products);
  //   })
  //   .catch(error => {
  //     console.log(error.response.data)
  //   });
  // }, []);


  // const goToDetailPage = (restaurantId) => {
  //   navigate(`/detalhesRestaurante/${restaurantId}`)
  // }


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

    </div>
  );
};

export default Carrinho;