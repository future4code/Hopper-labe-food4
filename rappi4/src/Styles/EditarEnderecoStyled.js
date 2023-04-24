import styled from "styled-components";

export const AlterarEnderecoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .Conteudo {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    p {
      margin-top: 28px;
      margin-bottom: 20px;
      font-family: "Roboto", sans-serif;
      font-weight: 600;
    }
    .input_btn{
  width: 90vw;
  height: 42px;
  background-color: #e86e5a;
  color: black;

}
  }

  .input_text {
    width: 90vw;
    height: 72px;

    input:focus {
      border: 1px solid;
      border-color: red;
      outline-style: none;
      border-style: none;
    }

    input {
      border-color: #e86e5a;
    }
  }
`;