import React from "react";
import { PopUpDiv } from "./styled";

function PopUp1(props){
    console.log("CHAMOU O POPUP")
    console.log(props.trigger)
    return (
     props.trigger ? 
        <PopUpDiv>
            <button onClick={()=>props.setTrigger(false)}>x</button>
            
            {props.children}
        </PopUpDiv>
     : ''
    )

}

export default PopUp1;

