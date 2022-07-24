import { useNavigate, useParams } from "react-router-dom";
import { useRequestData2, useRequestData } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { vaiParaFeed } from "../Router/RouteFunctions"
import { useProtectedPage } from "../Hooks/UseProtectPage"
import { useState, useEffect } from "react";

const DetalhesRestaurante = () => {

  useProtectedPage();

  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurante, loading, erro] = useRequestData2(`${BASE_URL}/restaurants/${id}`)
  const [contaVezes, setContaVezes] = useState(0);
  // const [pagamento, setPagamento] = useState

  let rest = restaurante? restaurante : "carregando"

  console.log(rest)
  
   const soma = (preco) => {
    return (preco * contaVezes)
  }

  // console.log(contaVezes)

  const somaUm = () => {
    return setContaVezes(contaVezes + 1)
  }

  const DiminuiUm = () => {
    return setContaVezes(contaVezes - 1)
  }

    const listaCardapio = rest.products && rest.products.map((prato) => {
    return (
      <div key={prato.id}>
        <img src={prato.photoUrl} width="75px" height="75px" />
        <p>{prato.name}</p>
        <p>{prato.description}</p>
        <p>{prato.price}</p>
        <button onClick={somaUm}>+</button>
        <button onClick={DiminuiUm}>remover</button>
        <p> {soma(prato.price)}  </p>
        {/* <button onClick={() => fazPedido(prato.id)}>Enviar Pedido</button> */}
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
      <br></br>
      <h3>Acompanhamentos</h3>


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
