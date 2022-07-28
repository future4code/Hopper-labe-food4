import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "../Pages/Feed"
import Cadastro from "../Pages/Cadastro"
import Login from "../Pages/Login"
import { Carrinho } from '../Pages/Carrinho';
import DetalhesRestaurante from '../Pages/DetalhesRestaurantes';
import EditarCadastro from '../Pages/EditarCadastro';
import EditarEndereco from '../Pages/EditarEndereco';
import Perfil from '../Pages/Perfil';



const Router = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Feed />} />
          <Route path={"/cadastro"} element={<Cadastro />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/carrinho/:id"} element={<Carrinho />} />
          <Route path={"/detalhesRestaurante/:id"} element={<DetalhesRestaurante />} />
          <Route path={"/editarCadastro"} element={<EditarCadastro />} />
          <Route path={"/editarEndereco"} element={<EditarEndereco />} />
          <Route path={"/perfil"} element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;