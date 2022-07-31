import React from "react";

import { PopUpDiv } from "./styled";


function PopUp2(props) {
    return (
        <div>
            {props.trigger ?
                <PopUpDiv>
                    {props.children}
                </PopUpDiv>
                : ''}
        </div>
    )

}

export default PopUp2;