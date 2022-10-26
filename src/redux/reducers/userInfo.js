import React from "react";

let initState = {
    username: "",
    email: "",
    uid: "",
    adminstat: false,
}

const userInfo = (state=initState,action) => {
    switch(action.type) {
        case "act/get-name":
            return {
                ...state,
                username: action.payload
            }
        case "act/get-email":
            return {
                ...state,
                email: action.payload
            }
        case "act/get-uid":
            return {
                ...state,
                uid: action.payload
            }
        case "act/admin-status":
            return {
                ...state,
                adminstat: action.payload
            }
        default:
            return state
    }
}

export default userInfo;