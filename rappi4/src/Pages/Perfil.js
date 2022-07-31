import React, { useEffect, useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/urls";
import { useRequestData } from "../Hooks/useRequestData";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import { vaiParaFeed, vaiParaPerfil, vaiParaCarrinho, vaiParaEditarCadastro, vaiParaEditarEndereco } from "../Router/RouteFunctions";
import axios from "axios";
import userEvent from "@testing-library/user-event";



const Perfil = () => {

  useProtectedPage();
  const navigate = useNavigate();

  //Perfil do usuário

  const [mostrarDados, setMostrarDados] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${BASE_URL}/profile`, {
      headers: {
        auth: token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setMostrarDados(response.data.user)
        //localStorage.getItem("token", response.data.token);
        console.log(response.data.user)
      })
      .catch(error => {
        console.log(error.response)
      })
  }, [])

  //Endereço do usuário

  const [mostrarEndereco, setMostrarEndereco] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${BASE_URL}/profile/address`, {
      headers: {
        auth: token
      }
    })
      .then(response => {
        setMostrarEndereco(response.data.address)
        console.log(response.data.address)
      })
      .catch(error => {
        console.log(error.response)
      })
  }, [])

  const [pedido, loading, erro] = useRequestData(`${BASE_URL}/orders/history`);

  const ped = !!pedido ? pedido : "carregando";
  const pedidos = ped.orders;
  console.log(pedidos)

  const historicoPedidos = pedidos && pedidos.map((pedido) => {  
    return (<div>
      <p>{pedido.restaurantName}</p>
      <p>{pedido.date}</p>
      <h4>{`SUBTOTAL R$ ${pedido.totalPrice}`}</h4>
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
      
      <h4>{mostrarDados.name}</h4>
      <h4>{mostrarDados.email}</h4>
      <h4>{mostrarDados.cpf}</h4>
      <button onClick={() => vaiParaEditarCadastro(navigate)}>Editar Cadastro</button>

      <h2>Endereço Cadastrado</h2>
      <h4 >
        {mostrarEndereco.street}, {mostrarEndereco.number} - {mostrarEndereco.city}
      </h4>
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