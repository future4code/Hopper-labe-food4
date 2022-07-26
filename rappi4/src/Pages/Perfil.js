import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/urls";
import { useRequestData } from "../Hooks/useRequestData";
import { vaiParaFeed, vaiParaPerfil, vaiParaCarrinho, vaiParaEditarCadastro, vaiParaEditarEndereco } from "../Router/RouteFunctions";


const Perfil = () => {
  const navigate = useNavigate();

  const [pedidos, loading, erro] = useRequestData(`${BASE_URL}/orders/history`);

  console.log(pedidos)

  const historicoPedidos = pedidos && pedidos.map((pedido) => {  //arrumar conforme os dados corretos da api
    return (<div>
      <h3>{pedido.name}</h3>
      <p>{pedido.date}</p>
      <h2>{`SUBTOTAL R$ ${pedido.total}`}</h2>
    </div>
    )
  })



  return (
    <div>
      <h1>Meu Perfil</h1>
      <button onClick={() => vaiParaFeed(navigate)}>Feed</button>
      <button onClick={() => vaiParaPerfil(navigate)}>Perfil</button>
      <button onClick={() => vaiParaCarrinho(navigate)}>Carrinho</button>
      <br></br>
      <button onClick={() => vaiParaEditarCadastro(navigate)}>Editar Cadastro</button>
      <button onClick={() => vaiParaEditarEndereco(navigate)}>Editar Endereço</button>

      <h3>Historico de Pedidos:</h3>

      {loading && loading && <p>Carregando...</p>}
      {!loading && erro && <p>Deu ruim!</p>}
      {!loading && pedidos && pedidos.length > 0 && historicoPedidos}
      {!loading && pedidos && pedidos.length === 0 && <h3>Você não realizou nenhum pedido</h3>}

    </div>
  );
};

export default Perfil;