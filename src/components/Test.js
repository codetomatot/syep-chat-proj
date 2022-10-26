import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Test(props) {
    const tname = useSelector(state => state.userInfo.username);
    return (
        <div>
            <p>test page. nothing to see here</p>
            {/* <p>{props.prop_id}</p> */}
            <p>your name: {tname}</p>
        </div>
    )
}