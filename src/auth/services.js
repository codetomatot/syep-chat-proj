import React from "react";
import firebase from "firebase/compat/app";
import { db } from "../firebase-config";
import { getAuth, signInAnonymously, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc, deleteDoc, setDoc, updateDoc, doc, collectionGroup, getDoc } from "firebase/firestore";
import ael from "../la.json";
import { useSelector, useDispatch } from "react-redux";
import { isLogged, notLogged } from "../redux/actions/actions";

const auth = getAuth();
const userCol = collection(db, "users");

async function Services(provider=null, email=null, pass=null) {
    const ael_arr = ael[Object.keys(ael)[0]];

    if(provider !== null && (typeof provider) !== "string") {
        await signInWithPopup(auth, provider).then((res) => {
            const gcd = doc(db, "users", auth.currentUser.uid); //document reference
            // const postsCol = collection(gcd, "posts"); 
            var G_user = res.user;
            var G_id = res.uid;
            let adminAcc = false;
            for(let i = 0; i < ael_arr.length; i++) {
                if(G_user.email === ael_arr[i]) {
                    adminAcc = true;
                    break;
                }
            }
            setDoc(gcd, {
                name: G_user.displayName,
                email: G_user.email,
                id: G_user.uid,
                type: "google",
                isAdmin: adminAcc,
                loggedInCurrently: true
            }).then(() => {
                console.log("written"); 
            }).catch(er => {console.log(er)});
        });
    } else if(provider === "emailpass" && email !== null && pass !== null) {
        console.log("plc");

        createUserWithEmailAndPassword(auth, email, pass).then((res) => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            console.log('user: ', res.user);
            setDoc(docRef, {
                name: null,
                email: email,
                password: pass,
                id: res.user.uid,
                type: "manual login",
                isAdmin: false,
                loggedInCurrently: true
            }).then(() => {console.log("written")}).catch(er => {console.log(er)})
        })
        .catch((er) => {
            console.log(er);
            switch(er.code) {
                case 'auth/email-already-in-use':
                    console.log("the email is in use");
                    break;
                default:
                    console.log(er);
                    break;
            }
        });
    } else {
        console.log("anon login");
        await signInAnonymously(auth);
    }
}

export default Services;