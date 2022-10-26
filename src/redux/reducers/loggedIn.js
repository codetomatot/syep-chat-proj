import React from "react";

let initState = {
    loggedIn: false,
}

const LoggedIn = (state=initState, action) => {
    switch(action.type) {
        case "act/true-log":
            return {
                ...state,
                loggedIn: true
            }
        case "act/false-log":
            return {
                ...state,
                loggedIn: false
            }
        default:
            return state
    }
}
export default LoggedIn