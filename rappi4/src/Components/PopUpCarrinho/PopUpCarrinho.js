import React from "react";
import {PopUpDiv} from "./styled";

function PopUp2(props){
    console.log("CHAMOU O POPUP")
    console.log(props.trigger)
    return (
     props.trigger ? 
        <PopUpDiv>
            {props.children}
        </PopUpDiv>
     : ''
    )

}

export default PopUp2;