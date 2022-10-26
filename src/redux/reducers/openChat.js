import React from "react";

let initState = {
    chatOpen: false
}

const OpenChat = (state=initState, action) => {
    // const uid = useSelector(state => state.userInfo.uid);
    switch(action.type) {
        case "act/open-chat":
            return {
                ...state,
                chatOpen: true
            }
        case "act/exit-chat":
            return {
                ...state,
                chatOpen: false
            }
        default:
            return state
    }
}

export default OpenChat;