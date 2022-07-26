import { GlobalContext } from "./GlobalContext";
import React, {useState} from "react";
import { useRequestData2 } from "../Hooks/useRequestData";
import { BASE_URL } from "../Constants/urls";
import { useParams } from "react-router-dom";

export const GlobalState = (props) => {

    const [carrinho, setCarrinho] = useState([]);
    const [quantity, setQuantidade] = useState(0);

    const addCarrinho = (produtos) => {
        const index = carrinho.findIndex((produtoCarrinho) => {
          if (produtoCarrinho.id === produtos.id) {
            return true;
          } else {
            return false;
          }
        });
    
        if (index === -1) {
          const produtoComQuantidade = {
            ...produtos, quantity: quantity, precoTotalItem: quantity * produtos.price
          };
          const copiaCarrinho = [...carrinho, produtoComQuantidade];
          setCarrinho(copiaCarrinho);
        } else {
          const copiaCarrinho = carrinho.map((produtoCarrinho) => {
            if (produtoCarrinho.id === produtos.id) {
              return {
                ...produtoCarrinho, quantity: quantity
              };
            } else {
              return produtoCarrinho
            }
          });
          setCarrinho(copiaCarrinho)
        }
      }
    
      const removeCarrinho = (produtos) => {
        const carrinhoAtualizado = carrinho.map((produtoCarrinho) => {
          if (produtoCarrinho.id === produtos.id) {
            return {
              ...produtoCarrinho, quantity: quantity - quantity, precoTotalItem: quantity * produtos.price
            }
          }
          return produtoCarrinho;
        })
          .filter((produto) => produto.quantity > 0)
        setCarrinho(carrinhoAtualizado)
      }

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

      

    const states = {
        carrinho,
        quantity,
    }

    const setters = {
        setCarrinho,
        setQuantidade
    }

    const dados = {
        addCarrinho, 
        removeCarrinho,
        selecionaQuantidade
    }

    return (
        <GlobalContext.Provider value={{states, setters, dados}}>
            {props.children}
        </GlobalContext.Provider>
    )
};