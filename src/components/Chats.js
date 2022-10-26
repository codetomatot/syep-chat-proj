import React, {useRef,useState,useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import { collection, getDocs, getDoc, doc, addDoc, setDoc, updateDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase-config";
import { useAlert } from "react-alert";

import { newChat, exitChat, arrMsg, isLogged, notLogged} from "../redux/actions/actions";
// import { resolveTo } from "react-router/lib/router";
import "./styles/ChatUI.css";

import { HiStatusOnline } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";

import IsolationImage from "./isolation.jpg";
import MentalHealth from "./chats-img.jpg";

class Chats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: {},
            allAdminStatus: [],
            menuToggle: false,
        }

        this.openNewChat = this.openNewChat.bind(this);
        // this.adminEnterChat = this.adminEnterChat.bind(this);
    }
    async openNewChat() {
        const newChat = collection(db, "chats");
        const userDocRef = doc(db, "chats", this.props.id);
        await setDoc(userDocRef, {
            timeCreated: serverTimestamp(),
            to: null,
            toId: null,
            from: this.props.username,
            fromId: this.props.id,
            fromEmail: this.props.email,
            chatStateOpen: true,
        });
        this.props.newChat();
    }
    exit_chat() {
        const docRef = doc(db, "chats", this.props.id);
        const gd = getDoc(docRef);
        updateDoc(docRef, {
            chatStateOpen: false,
        });
        this.adminExitChat(this.props.id);
        this.props.exitChat();
    }
    async backup() {
        const docRef = doc(db, "chats", this.props.id);
        const gd = await getDoc(docRef);
        if(gd.exists()) {
            if(gd.data().chatStateOpen === true) {
                this.props.newChat();
            } else {
                this.props.exitChat();
            }
        }
        // window.location.reload();
    }
    async adminEnterChat(chatUserId) {
        const docRef = doc(db, "chats", chatUserId);
        let docCheck = await getDoc(docRef);
        if(docCheck.exists()) {
            if(docCheck.data().to === null && docCheck.data().toId === null) {
                await updateDoc(docRef, {
                    to: this.props.username,
                    toId: this.props.id,
                });
            } else {
                alert("An admin is in this room already");
                console.log("there is an admin here already");
            }
        }
    }
    async adminCheckInChat() {
        const BreakError = {};
        try {
            const chatRef = collection(db, "chats");
            let chatDocs = await getDocs(chatRef);
            let arr = [];
            chatDocs.docs.forEach((chatdoc) => {
                if(chatdoc.data().to !== null && chatdoc.data().toId !== null) {
                    console.log("document: ", chatdoc.id, " is not null");
                    if(this.props.id === chatdoc.data().toId) {
                        arr.push({
                            adminJoined: true,
                            userInChatId: chatdoc.id,
                            userName: chatdoc.data().from,
                            userEmail: chatdoc.data().fromEmail,
                            adminInChat: chatdoc.data().to,
                            adminInChatId: chatdoc.data().toId,
                        });
                        console.log(arr);
                        this.setState({
                            allAdminStatus: arr,
                        })
                        console.log("breaking");
                        throw BreakError;
                    } else {
                        console.log(this.props.id);
                        console.log(chatdoc.data().toId);
                    }
                } else {
                    console.log("document: ", chatdoc.id, " is null");
                }
            });
        } catch(err) {
            if (err !== BreakError) throw err;
        }
    }
    adminViewChats() {
        const chatRef = collection(db, "chats");
        const docRef = doc(db, "chats", this.props.id);
        onSnapshot(chatRef, (snapshots) => {
            let newChats = snapshots.docs.map((snapshot) => ({
                id: snapshot.id,
                ...snapshot.data()
            }));
            this.setState({
                adminViewDocs: newChats
            });
            return newChats;
        })
    }
    async adminExitChat(uicid) {
        console.log(uicid);
        const docRef = doc(db, "chats", uicid);
        let gud = await getDoc(docRef);
        if(gud.exists()) {
            if(gud.data().chatStateOpen === false) {
                updateDoc(docRef, {
                    to: null,
                    toId: null
                })
            } else {
                console.log("what??");
                this.exit_chat();
                // window.location.reload();
            }
        }
    }

    componentDidMount() {
        this.backup();
        this.adminViewChats();
        this.adminCheckInChat();
        // this.reloadAdminChat();
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.chatState.chatOpen !== prevProps.chatState.chatOpen) { //props of the user
            this.backup();
        }
        if(this.props.isAdmin !== prevProps.isAdmin) {
            this.adminViewChats();
        }
        if(this.state.allAdminStatus !== prevState.allAdminStatus) {
            console.log(this.state.allAdminStatus);
        }
    }
    
    render() {
        console.log(this.state.allAdminStatus);
        if(this.props.isAdmin) {
            return (
                <div>
                    <div>
                        {this.state.allAdminStatus[0] !== undefined || this.state.allAdminStatus.length > 0 ?
                            <div>
                                <button onClick={() => this.adminExitChat(this.state.allAdminStatus[0].userInChatId)}>Exit</button>
                                <ServeChatUI 
                                uid={this.state.allAdminStatus[0].userInChatId} 
                                name={this.state.allAdminStatus[0].userName}
                                uemail={this.state.allAdminStatus[0].userEmail}
                                adminInfo={this.state.allAdminStatus[0]}
                                />
                            </div> 
                        :
                        <div className="admins">
                            {this.state.adminViewDocs !== undefined ?
                                <div>
                                    {this.state.adminViewDocs.map((obj, index) => {
                                        return (
                                            <div>
                                                {obj.chatStateOpen === true ?
                                                    <div key={index} className="admin-chats-ave" style={{ cursor: "pointer" }} onClick={() => this.adminEnterChat(obj.fromId)}>
                                                        {obj.chatStateOpen === true ? <HiStatusOnline className="status-online" /> : <HiStatusOnline className="status-offline" />}
                                                        <p>{obj.from}</p>
                                                        <p>{obj.fromEmail}</p>
                                                        <p>{obj.fromId}</p>
                                                    </div>
                                                    :
                                                    <div key={index} className="admin-chats-ave" style={{ cursor: "not-allowed" }}>
                                                        {obj.chatStateOpen === true ? <HiStatusOnline className="status-online" /> : <HiStatusOnline className="status-offline" />}
                                                        <p>{obj.from}</p>
                                                        <p>{obj.fromEmail}</p>
                                                        <p>{obj.fromId}</p>
                                                    </div>}
                                            </div>
                                        );
                                    })}
                                </div>
                                :
                                <p>no viewable chats</p>}
                            <div>
                                {this.state.allAdminStatus.map((obj, index) => {
                                    return (
                                        <div key={index}>
                                            <p>admin: {obj.adminInChat} joined: {obj.userInChatId}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        }
                    </div> 
                </div>
            )
        } else {
            return (
                <div className="nu">
                    {this.props.chatState.chatOpen === true ? 
                    <div>
                        <button onClick={() => this.exit_chat()}>Exit</button>
                    <ServeChatUI 
                    uid={this.props.id}
                    name={this.props.username}
                    uemail={this.props.email} /> 
                    </div>
                    : 
                    <div style={{margin: "25px", 
                    width: "100%",
                    height: "100%",
                    position: "relative"}}>
                        {/* <img src={MentalHealth} alt="mh img" width="800px" height="480px" /> */}
                        <button onClick={() => this.openNewChat()}
                        style={{
                            width: "200px",
                            height: "150px",
                            position: "absolute",
                            top: "40%",
                            left: "40%",
                            margin: "-25px 0 0 -25px"
                        }}
                        >Start Chatting</button>
                    </div>
                    }
                </div>
            );
        }
    }
}

function ServeChatUI(props) {
    // console.log(props.adminInfo);
    const inputRef = useRef(null);
    async function sendMessage() {
        const docRef = doc(db, "chats", props.uid); //[8]
        const msgCol = collection(docRef, "messages"); //[8]
        if(props.adminInfo !== undefined) {
            await addDoc(msgCol, {
                timestamp: serverTimestamp(),
                text: inputRef.current.value.toString(),
                from: props.adminInfo.adminInChat,
                fromId: props.adminInfo.adminInChatId
            });
        } else {
            console.log("this is the user send");
            await addDoc(msgCol, {
                timestamp: serverTimestamp(),
                text: inputRef.current.value.toString(),
                from: props.name,
                fromId: props.uid,
                fromEmail: props.uemail
            }); //[8]
        }
        inputRef.current.value = "";
    }
    if(props.adminInfo) {
        console.log("admin joined chat");
    }

    const [msgArr, setMsgArr] = useState([]);

    useEffect(() => {
        const docRef = doc(db, "chats", props.uid);
        const msgCol = collection(docRef, "messages");
        const q = query(msgCol, orderBy('timestamp'));
        const unsub = onSnapshot(q, (snapshot) => {
            let msgs = snapshot.docs.map((snap) => {
                // console.log(snap.data());
                return {
                    id: snap.id,
                    ...snap.data()
                }
            });
            // console.log(msgs);
            setMsgArr(msgs);
            return msgs;
        });
        return () => unsub();
    }, []);

    // console.log(msgArr);
    
    return (
        <div className="main-chat">
            <div className="msg-display"> 
                {msgArr !== undefined && msgArr.length > 0 ?
                <div className="all-msgs">
                    {/* {} */}
                    {msgArr.map((obj, index) => {
                        if(obj.timestamp !== null && obj.text !== null && (obj.from !== null || obj.fromEmail !== null)) {
                            const dts = obj.timestamp.toDate().toString().split(" "); //dts[4] is always the time
                            return (
                                <div key={index} className="chatmsg-box">
                                    <div className="divider"></div><p className="time-sent">{dts[4]}</p><div className="divider"></div><br />
                                    <p className="sender">from: {obj.from || obj.fromEmail}</p>
                                    <p className="msg-content">{obj.text}</p>
                                </div>
                            )
                        }
                    })}
                    {/* {} */}
                </div> 
                :
                <p>There are no messages to display</p>
                }
            </div>
            <div className="corr">
                <input type="text" className="msg-input" ref={inputRef} />
                <button className="main-send" onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    username: state.userInfo.username,
    email: state.userInfo.email,
    id: state.userInfo.uid,
    isAdmin: state.userInfo.adminstat,
    chatState: state.chatOpen,
    arrMsgs: state.MsgArr.arrOfMsg,
    isLoggedIn: state.LoggedIn.loggedIn,
});
const mapDispatchToProps = () => ({
    newChat,
    exitChat,
    arrMsg,
    isLogged,
    notLogged
})

export default connect(mapStateToProps,mapDispatchToProps())(Chats);