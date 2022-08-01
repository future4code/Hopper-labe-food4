import styled from "styled-components";

export const CadastroContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;

img{
  width: 104px;
  margin-bottom:28px;
}


.Conteudo{
  margin-top: 22px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50%;

}


.cadastro_title{
margin-bottom: 15px;

}

.input_text{
width: 90vw;
height: 72px;



input:focus{
border: 1px solid;
border-color: red;
outline-style: none;
border-style: none;
  
  }

  input{
    border-color: #e86e5a;
  }
}

p{
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

.input_btn{
  width: 90vw;
  height: 42px;
  background-color: #e86e5a;
  color: black;

}
`;

