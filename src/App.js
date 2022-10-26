import './App.css';
import { db } from "./firebase-config";
import { gp } from "./auth/auth_providers";
import React, {useState} from 'react';
import Services from './auth/services';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Routes from "./Routes";
import { Link } from 'react-router-dom';

import { inc, dec, getName, getEmail, uid, admin_status,isLogged,notLogged } from "./redux/actions/actions";

import { AiOutlineLink, AiOutlineMessage, AiFillMessage, AiFillCaretDown, AiOutlinePlus, AiOutlineArrowLeft, AiOutlineArrowRight, AiFillThunderbolt, AiFillBell, AiOutlineUser, AiOutlineLogout, AiFillHome } from "react-icons/ai";
import {BiCog} from "react-icons/bi";
import { FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdLogout } from "react-icons/md";

import SUI from "./components/Sample_User_Icon.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      open: false
    }
    this.emailInputRef = React.createRef();
    this.passInputRef = React.createRef();
    //log in
    this.emailLog = React.createRef();
    this.passLog = React.createRef();

    this.openMenu = this.openMenu.bind(this);
    this.updateLogOut = this.updateLogOut.bind(this);
    this.signout = this.signout.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  handleAuth(service, e, p) {
    if(service === "emailpass") {
      Services(service,e,p);
    } else {
      Services(service);
    }
  }
  manLogin = async(email, pass) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, pass).then((res) => {
      console.log("success log in");
      this.setState({loggedIn: true,});
    })
  }
  updateLogOut() {
    const docRef = doc(db, "users", this.props.userInfo.uid);
    console.log("sdtate should be updates")
    this.props.notLogged();
    updateDoc(docRef, {
      loggedInCurrently: false,
    });
  }
  signout() {
    const auth = getAuth();
    this.updateLogOut();
    signOut(auth).then(() => {
      console.log("logged out");
    });
  }
  deleteAccount() {
    const auth = getAuth();
    const userRef = collection(db, "users");
    const docRef = doc(db, "users", auth.currentUser.uid);
    const chatDocsRef = doc(db, "chats", auth.currentUser.uid);
    // console.log("user gone");
    deleteDoc(docRef).then(() => {
      console.log("user deleted successfully");
      deleteUser(auth.currentUser).then(() => {
        this.setState({
          loggedIn: false,
        });
      })
    }).catch((er) => {
      console.log(er);
    })
    deleteDoc(chatDocsRef).then(() => {
      console.log("chats deleted");
    }).catch(er => {
      console.log(er);
    })
  }

  openMenu() {
    let currentState = this.state.open;
    this.setState({
      open: !currentState //breaks if this.state.open is here (infinite loop)
    })
  }
  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if(!user) {
        // console.log(this.state.loggedIn)
        this.setState({
          loggedIn: false, 
          loaded: true
        })
      } else {
        this.props.getName(user.displayName);
        this.props.getEmail(user.email);
        this.props.uid(user.uid);
        // this.props.admin_status();
        this.setState({
          loggedIn: true,
          username: user.displayName,
          email: user.email,
          id: user.uid,
          loaded: true,
          pfp: user.photoURL || SUI,
        });
        const userCol = collection(db, "users");
        const docRef = doc(db, "users", auth.currentUser.uid);
        let da = getDoc(docRef).then((data) => {
          this.props.admin_status(data.data().isAdmin);
        })
      }
    })
  }

  render() {
    // console.log(this.props)
    if(!this.state.loaded) {
      return (
        <div className='loaddiff'>
          <h1>Loading...</h1>
        </div>
      )
    }
    if(this.state.loggedIn == false) {
      return (
        <div className='no-login'>
          <h1>Sign up or Login</h1>
          <button onClick={() => this.handleAuth(gp)} className="glogin"><FcGoogle className='glogo' />Sign with Google</button>
          <h3>Or</h3>
          <div>
            <h4>Sign Up</h4>
            <input type='email' className='wemail' ref={this.emailInputRef} placeholder="Email" /><br />
            <input type='password' className='wpass' ref={this.passInputRef}placeholder="Password" /><br />
            <button className='sl-btn' onClick={() => this.handleAuth("emailpass",this.emailInputRef.current.value, this.passInputRef.current.value)} >Sign Up</button>
          </div>
          <h3>Or</h3>
          <div>
            <h4>Login Manually</h4>
            <input type='email' className='wemail' ref={this.emailLog} placeholder="Email login" /><br />
            <input type='password' className='wpass' ref={this.passLog} placeholder="Password login" /><br />
            <button className='sl-btn' onClick={() => this.manLogin(this.emailLog.current.value, this.passLog.current.value)}>Login</button>
          </div>
          <div>
            {/* <h4>Sign as Guest User</h4>
            <button onClick={() => this.handleAuth("anon")}>Sign as Guest</button> */}
            <p >Don't want to sign up? Thats fine. Put any email and password down and you can still remain
              anonymous
            </p>
          </div>
        </div>
      )
    }
    return (
      <div className='logged-in'>
        <Navbar>
          <NavItem icon={<AiFillHome />} linkTo="/"></NavItem>
          <NavItem icon={<AiFillMessage />} title="chat now" linkTo="/chats"></NavItem>
          <NavItem icon={<img src={this.state.pfp} referrerPolicy="no-referrer" className='nested-pfp' style={{width: "45px",height:"45px", cursor: "pointer"}} />}>
            <DropDown logout={this.signout} delAcc={this.deleteAccount} style={{zIndex: "2"}} />
          </NavItem>
        </Navbar>
        <Routes />
        {/* <button onClick={this.signout}>logout</button> */}
      </div>
    )
  }
}

function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  );
}
function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className='nav-item'>
      <a href={props.linkTo} title={props.title} className='icon-button' onClick={() => setOpen(!open)}>{props.icon}</a>
      {open && props.children}
    </li>
  );
}
function DropDown(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  function calcHeight(element) {
    const height = element.offsetHeight; //offset changes due to box-sizing css property
    setMenuHeight(height);
  }
  function DropDownItem(props) {
    return (
      <div>
        {!props.speclassName ? 
          <a href="#" className='menu-item' style={{color: "#fff", textDecoration: "none"}} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className='icon-button'>{props.leftIcon}</span>
            {props.children}
            <span className='icon-right'>{props.rightIcon}</span>
          </a> : 
        <a href="#" className='red-important' style={{color: "#fff", textDecoration: "none"}}>
          <span className='icon-button'>{props.leftIcon}</span>
          {props.children}
          <span className='icon-right'>{props.rightIcon}</span>
        </a>
        }
      </div>
    )
  }
  return (
    <div className='dropdown' style={{height: menuHeight, zIndex: "2"}}>
      <CSSTransition in={activeMenu === "main"}
      unmountOnExit 
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}>
        <div className='menu'>
          <DropDownItem leftIcon={<BiCog />} rightIcon={<FaChevronRight />} goToMenu="settings">Settings</DropDownItem>
          <DropDownItem leftIcon={<AiOutlineMessage />} rightIcon={<FaChevronRight />} goToMenu="animals">Chat here</DropDownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === "settings"}
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      onEnter={calcHeight}>
        <div className='menu'>
          <DropDownItem leftIcon={<AiOutlineArrowLeft />} goToMenu="main">Main</DropDownItem>
          <DropDownItem leftIcon={<AiOutlineLogout />}><div onClick={props.logout}
          style={{
            width: "100%",
            height: "100%",
            textAlign: "left",
            marginTop: "30px",
            marginLeft: "10px"
          }}>Log Out</div></DropDownItem>
            <DropDownItem leftIcon={<FaTrashAlt />} speclassName="red-important-ddi"><div
            style={{
              width: "100%",
              height: "100%",
              textAlign: "left",
              marginTop: "30px",
              marginLeft: "10px"
            }} onClick={props.delAcc}>Delete Account</div></DropDownItem>
        </div>
      </CSSTransition>

      <CSSTransition
      in={activeMenu === 'animals'}
      unmountOnExit
      timeout={500}
      classNames="menu-third"
      onEnter={calcHeight}
      >
        <div className='menu'>
          <DropDownItem leftIcon={<AiOutlineArrowLeft />} goToMenu="main">Main</DropDownItem>
          <DropDownItem><Link to={{pathname: "/chats"}} style={{color: "#fff", fontSize: "16px", textDecoration: "none"}}>Chats</Link></DropDownItem>
          <DropDownItem><Link to={{pathname: "/"}} style={{color: "#fff", fontSize: "16px", textDecoration: "none"}}>Home</Link></DropDownItem>
        </div>
      </CSSTransition>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
    value: state.value,
    userInfo: state.userInfo,
    firebaseLogStat: state.LoggedIn.loggedIn
});
const mapDispatchToProps = () => ({
  inc,
  dec,
  getName,
  getEmail,
  uid,
  admin_status,
  isLogged,
  notLogged
});

export default connect(mapStateToProps,mapDispatchToProps())(App);

//color codes:
//#c29286 <- pinkish
//#9d6041 <- orangish
//#c59766 <- yellowish
//#8cafb6 <- bluish
//#33443d <- dark aquaish-green