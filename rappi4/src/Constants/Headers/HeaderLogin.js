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
align-items: center;
    width: 90vw;

}


.Icon_L{
cursor: pointer;
}



`;

export const HeaderLogin = () => {

    const navigate = useNavigate()

    return (
        <HeaderLoginContainer>

            <div className='Nav_Icons'>

                < ArrowBackIosNewIcon onClick={() => vaiParaLogin(navigate)} sx={{ color: 'black' }} className='Icon_L' />

            </div>
        </HeaderLoginContainer>
    )
}

