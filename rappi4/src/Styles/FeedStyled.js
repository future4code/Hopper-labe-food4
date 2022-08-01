import styled from "styled-components";

export const FeedContainer = styled.div`
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

    .busca {
      display: flex;
      height: 56px;
      border: 1px solid #b8b8b8;
      display: flex;

      align-items: center;
      border-radius: 2px;
      width: 90vw;
      margin-top: 8px;

      .pesquisa {
        width: 50px;
      }

      input {
        border-style: none;
        border: none;
        background-color: transparent;
        border-color: white;
        border-style: none;
        outline-offset: 1px;
        height: 50px;
        width: 100%;
        outline-style: none;
        font-size: 16px;
      }

      input::placeholder {
        color: #b8b8b8;
        font-size: 16px;
      }
    }

    .atalhos-Restaurantes {
      display: flex;
      flex-wrap: wrap;
      max-width: 93%;
      margin-bottom: 12px;
      margin-top: 5px;

      justify-content: center;
      align-items: center;
      font-weight: 600;
      line-height: 10px;
      button {
        padding: 5px;
        border-style: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 15px;
      }

      button:focus {
        color: #ff9500;
        font-weight: 600;
      }
    }

    .CardProduct {
      border: 1px solid grey;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-end-end-radius: 5px;
      border-end-start-radius: 5px;
      width: 90vw;
      margin-bottom: 8px;
      img {
        width: 100%;
        height: 120px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      .infos_container {
        height: 45px;
        padding: 10px;
        .rest_name {
          color: #e86e5a;
        }
        .rest_infos {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
        }
      }
    }
  }

  footer {
    background-color: #fff;
    border-top: 1px solid #b8b8b8; ;
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
`;