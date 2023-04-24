import styled from "styled-components";

export const LoginContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;


img{
  width: 104px;
}


.Conteudo{
  margin-top: 88px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;

}

.input_text{

  width: 90vw;
  height: 72px;



  input:focus{

  box-shadow: none;
    

  }
}

p{
  margin-top: 28px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 12px;
}

.input_btn{
  width: 90vw;
  height: 42px;
  background-color: #e86e5a;
  color: black;

 
}
`;
