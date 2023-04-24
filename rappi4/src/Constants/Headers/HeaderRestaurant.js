import React from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { vaiParaFeed, vaiParaLogin } from "../../Router/RouteFunctions";
const HeaderLoginContainer = styled.div`
  display: flex;
  height: 64px;
  width: 100vw;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  .Nav_Icons {
    display: flex;
    align-items: center;
    width: 90vw;
    height: 64px;

  }

  .Icon_L {
    cursor: pointer;


  }

  p {
    margin-left: 30%;
    font-family: "Roboto", sans-serif;
      font-weight: 600;

  }
`;

export const HeaderRestaurant = () => {
    const navigate = useNavigate();

    return (
        
        <HeaderLoginContainer>
            <div className="Nav_Icons">
                <ArrowBackIosNewIcon
                    onClick={ () => vaiParaFeed(navigate)}
                    sx={{ color: "black" }}
                    className="Icon_L"
                />

                <p>Restaurante</p>
            </div>
        </HeaderLoginContainer>
    );
};
