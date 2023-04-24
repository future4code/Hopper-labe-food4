import React from 'react'
import styled from 'styled-components'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { vaiParaLogin } from '../../Router/RouteFunctions';



const HeaderLoginContainer = styled.div`

display: flex;
width: 100%;
height: 64px;
justify-content: center;
align-items: center;
border-bottom: 1px solid rgba(0, 0, 0, 0.25);


.Nav_Icons{
display: flex;
    align-items: center;
    width: 90vw;
    height: 64px;
    justify-content: center;
    align-content: center;
font-weight: 600;

}


.Icon_L{
cursor: pointer;
}



`;

export const HeaderFeed = () => {

    const navigate = useNavigate()

    return (
        <HeaderLoginContainer>

            <div className='Nav_Icons'>

                <p>Rappi4</p>

            </div>
        </HeaderLoginContainer>
    )
}

