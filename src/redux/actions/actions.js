import React from "react";

export const inc = () => {
    return {
        type: "act/inc"
    }
}
export const dec = () => {
    return {
        type: "act/dec"
    }
}

export const isLogged = () => {
    return {
        type: "act/true-log"
    }
}
export const notLogged = () => {
    return {type: "act/false-log"}
}


export const getName = (db_uname) => {
    return {
        type: "act/get-name",
        payload: db_uname
    }
}
export const getEmail = (db_email) => {
    return {
        type: "act/get-email",
        payload: db_email
    }
}
export const uid = (currentUser_uid) => {
    return {
        type: "act/get-uid",
        payload: currentUser_uid
    }
}
export const admin_status = (isadmin) => {
    return {
        type: "act/admin-status",
        payload: isadmin
    }
}

export const newChat = () => {
    return {
        type: "act/open-chat"
    }
}
export const exitChat = () => {
    return {
        type: "act/exit-chat"
    }
}

export const arrMsg = (newArr) => {
    return {
        type: "act/gma",
        payload: newArr
    }
}
export const uici = (uicid) => {
    return {
        type: "act/uic",
        payload: uicid
    }
}
export const uicname = (uicname) => {
    return {
        type: "act/uicname",
        payload: uicname
    }
}
export const uicem = (uicemail) => {
    return {
        type: "act/uice",
        payload: uicemail
    }
}
export const aicn = (aicname) => {
    return {
        type: "act/aicn",
        payload: aicname
    }
}
export const aicid = (aicid) => {
    return {
        type: "act/aicid",
        payload: aicid
    }
}