import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/urls";
import { useRequestData } from "../Hooks/useRequestData";
import axios from "axios";
import { useProtectedPage } from "../Hooks/UseProtectPage";
import {
  vaiParaFeed,
  vaiParaPerfil,
  vaiParaCarrinho,
  vaiParaEditarCadastro,
  vaiParaEditarEndereco,
} from "../Router/RouteFunctions";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "styled-components";
import { HeaderPerfil } from "../Constants/Headers/HeaderPerfil";
import EditIcon from "@mui/icons-material/Edit";

const ProfileContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;



  .Conteudo {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100vh;
    width: 100%;


    .dados_Container {
      margin-left: 10px;
      display: flex;
      justify-content: space-between;
      height: 90px;
      line-height: 22px;
      width: 92%;

      .dados {
        padding: 10px;
        font-size: 16px;
      }
      .edit_btn {
        padding: 10px;
        cursor: pointer;
      }
    }

    .end_cadastrado{
      width: 100%;
      height: 76px;
      display: flex;
      justify-content: start;
      align-items: center;
      background-color: 
#eeeeee;
      width: 100%;

      .btn_editEnd{
     margin-left :75px ;
    }
    .dados_End{
      margin-left: 20px;
    }
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
.hist_pedidos{
  margin-left: 20px;
  width: 90%;

  #title_Historico{
    border-bottom: 1px solid black;
    margin-top: 10px;
    width: 100%;
  }
}
  }
`;

const Perfil = () => {
  //Perfil do usuário
  useProtectedPage()

  const [mostrarDados, setMostrarDados] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BASE_URL}/profile`, {
        headers: {
          auth: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMostrarDados(response.data.user);
        //localStorage.getItem("token", response.data.token);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  //Endereço do usuário

  const [mostrarEndereco, setMostrarEndereco] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BASE_URL}/profile/address`, {
        headers: {
          auth: token,
        },
      })
      .then((response) => {
        setMostrarEndereco(response.data.address);
        console.log(response.data.address);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const navigate = useNavigate();
  const [pedido, loading, erro] = useRequestData(`${BASE_URL}/orders/history`);
  const ped = !!pedido ? pedido : "carregando";
  const pedidos = ped.orders;

  const historicoPedidos =
    pedidos &&
    pedidos.map((pedido) => {
      let data = pedido.createdAt;
      let dataTime = new Date(data);
      let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      let resultado = dataTime.toLocaleString("pt", options);

      return (
        <div>
          <p>{pedido.restaurantName}</p>
          <p>{resultado}</p>
          <h4>{`SUBTOTAL R$ ${parseFloat(pedido.totalPrice).toFixed(2)}`}</h4>
        </div>
      );
    });

  return (
    <ProfileContainer>
      <HeaderPerfil />

      <div className="Conteudo">
        <div className="dados_Container">
          <div className="dados">
            <h4>{mostrarDados.name}</h4>
            <h4>{mostrarDados.email}</h4>
            <h4>{mostrarDados.cpf}</h4>
          </div>

          <div className="edit_btn">
            <EditIcon onClick={() => vaiParaEditarCadastro(navigate)} />
          </div>
        </div>

        <div className='end_cadastrado'>

          <div className='dados_End'>

            <h3>Endereço Cadastrado</h3>

            <h4>
              {mostrarEndereco.street}, {mostrarEndereco.number} -{" "}
              {mostrarEndereco.city}
            </h4>

          </div>

          <div className='btn_editEnd'>
            <EditIcon onClick={() => vaiParaEditarEndereco(navigate)} />
          </div>


        </div>

<div className='hist_pedidos'>
<h3 id='title_Historico'>Histórico de Pedidos:</h3>

{loading && loading && <p>Carregando...</p>}
{!loading && erro && <p>Deu ruim!</p>}
{!loading && pedidos && pedidos.length > 0 && historicoPedidos}
{!loading && pedidos && pedidos.length === 0 && (
  <h3>Você não realizou nenhum pedido</h3>
)}


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
            onClick={() => vaiParaCarrinho(navigate)}
          />
        </footer>
      </div>
    </ProfileContainer>
  );
};

export default Perfil;
