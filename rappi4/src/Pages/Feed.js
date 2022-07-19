import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Feed = () => {
  const navigate = useNavigate();

  const [restaurantes, setRestaurantes] =useState([]);

  const receberRestaurantes = () => {
    axios
    .get(
        'https://us-central1-missao-newton.cloudfunctions.net/rappi4B/restaurants',
        {headers: {
          'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVQRjYxQnUwS2QyMjN3WGJmVkI3IiwibmFtZSI6IkRpZWdvIiwiZW1haWwiOiJkaWVnb0BmdXR1cmU0LmNvbSIsImNwZiI6IjEwMC4xMTEuMTExLTExIiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IlIuIEFmb25zbyBCcmF6LCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTY1ODE4NDcxMH0.hIi9zTSc7onX6LqITAGCx9k2YUBUQrfJXexA18knjBE',
          'Content-Type': 'application/json'}
        })
    .then(response => {    
        console.log(response.data.restaurants)
        setRestaurantes(response.data.restaurants);
    })
    .catch(error => {
        console.log(error.response.data)
    });
  }

  useEffect(() => {
    receberRestaurantes();
  }, []);

  return (

    <div>
        <h1>Feed</h1>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/cadastro")}>Cadastro</button>
        <br></br>
        <button onClick={() => navigate("/")}>Feed</button>
        <button onClick={() => navigate("/perfil")}>Perfil</button>
        <button onClick={() => navigate("/carrinho")}>Carrinho</button>
        <a onClick={() => navigate("/detalhesRestaurante")}>
            {restaurantes.map((rest) => {
              return(
                <p key={rest.id}>
                    <img src={rest.logoUrl} width="300px"/>
                    {rest.name}
                </p>
            )})}
        </a>
    </div>

  );
};

export default Feed;