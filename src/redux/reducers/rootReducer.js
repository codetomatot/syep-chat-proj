import React from "react";
import { combineReducers } from "redux";

import counter from "./counter";
import userInfo from "./userInfo";
import OpenChat from "./openChat";
import MsgArr from "./MsgArr";
import LoggedIn from "./loggedIn";

const rootReducer = combineReducers({
    value: counter,
    userInfo: userInfo,
    chatOpen: OpenChat,
    MsgArr: MsgArr,
    LoggedIn: LoggedIn
});
export default rootReducer;