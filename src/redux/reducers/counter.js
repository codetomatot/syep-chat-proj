import React from "react";

let initState = {
    value: 0,
}

const counter = (state=initState, action) => {
    switch(action.type) {
        case "act/inc":
            console.log("clicked")
            return {
                ...state,
                value: state.value + 1
            }
        case "act/dec":
            return {
                ...state,
                value: state.value - 1
            }
        case "act/reset":
            return {
                ...state,
                value: 0
            }
        default:
            return state
    }
}

export default counter;