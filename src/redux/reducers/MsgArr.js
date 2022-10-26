import React from "react";

let initState = {
    userInChatId: null,
    userName: null,
    userEmail: null,
    adminInChat: null,
    adminInChatId: null,
    msgArr: [],
}

const MsgArr = (state=initState,action) => {
    switch(action.type) {
        case "act/gma":
            return {
                ...state,
                msgArr: action.payload
            }
        case "act/uic":
            return {
                ...state,
                userInChatId: action.payload
            }
        case "act/uicname":
            return {
                ...state,
                userName: action.payload
            }
        case "act/uice":
            return {
                ...state,
                userEmail: action.payload
            }
        case "act/aicn":
            return {
                ...state,
                adminInChat: action.payload
            }
        case "act/aicid":
            return {
                ...state,
                adminInChatId: action.payload
            }
        default:
            return state
    }
}

export default MsgArr;