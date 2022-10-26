//logged in users
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BT1 from "./Better together-1.png";
import "./styles/Landing.css";
import MH from "./chats-img.jpg";
import Hope from "./hopeful.jpg";
import { Link } from "react-router-dom";

export default function Landing() {
    const isAdmin = useSelector(state => state.userInfo.adminstat);
    return (
        <div className="main-land">
            {/*show here chat component*/ }
            {/* <p>are you admin?</p>
            <p>you are {isAdmin ? "an admin" : "not"}</p> */}
            <img src={BT1} alt="alt" className="img-group-logo" />
            <img src={MH} alt="mh" className="img-group-logo2" />
            <img src={Hope} alt="" className="img-3" />
                <div className="info-card right">
                <p> There are two different types of isolation; 
                    self-isolation in which a person isolates themselves and social isolation when you are isolated by others.</p>

                </div>

                <div className="info-card right">
                    <p className="info-large-header">Why do people isolate others socially? -</p>
                    <ul>
                        <li>People may isolate themselves from you because you know right from wrong. Since you’re not easy to manipulate, they try and find someone else that will bend to their needs.</li>
                        <li>They may also do it because they're struggling to find themselves as a person so as a result, they’re pushing you away so they can stand on their own.</li>
                        <li>This set of friends weren't meant to be in your life forever. If they can’t watch you grow to be your own individual, then they aren't trying to support your growth.</li>
                    </ul>
                </div>
                <div className="info-card right">
                    <p className="info-large-header">Why people self-isolate- </p>
                    <ul>
                        <li>They may not be a good influence</li>
                        <li>Dealing with other things</li>
                        <li>Focused on the future</li>
                        <li>Self doubt</li>
                        <li>Don't feel connected to people anymore</li>
                    </ul> 
                </div>

                <div className="info-card left" style={{marginTop: "30px"}}>
                    <p className="info-large-header"> Signs of both types of isolation are  </p>
                    <ul>
                        <li>Panic about social interactions</li>
                        <li>Happiness with canceled plans</li>
                        <li>Limiting contact with others</li>
                        <li>Hesitating to communicate</li>
                        <li>Lying about your whereabouts </li>
                    </ul>
                </div>
                <div className="info-card left" style={{marginBottom: "30px"}}>
                    <p className="info-large-header">Why it's important not to isolate yourself </p>
                    <ul>
                        <li>You're in control of your life.. You can make your own choices that benefit you</li>
                        <li>Find your peace of mind; accept that you have weaknesses and that nobody is going to be perfect </li>
                        <li>The people that matter in your life will accept you for who you are. Not the character made up in their head</li>
                        <li>Create deep bonds with people who care about you</li>
                    </ul>
                </div>
                <div className="info-card right down">
                    <p className="info-large-header">How to stop isolating yourself-</p>
                    <ul>
                        <li>Do things that make you feel good/ content </li>
                        <li>Hangout with people that care about you </li>
                        <li>Find hobbies </li>
                        <li>Meet new people </li>
                        <li>Create a mood board (something that helps you write out your goals)</li>
                        <li>Make plans with others</li>
                    </ul>
                </div>
                <div className="info-card right down">
                    <p className="info-large-header">Things that help with the effects of both isolations -</p>
                    <ul>
                        <li>Stay away from toxic people </li>
                        <li>Don't stress about little things </li>
                        <li>Validate your feelings</li>
                        <li>Get closure from things/ relationships that you're uncertain about</li>
                        <li>Don't put others feelings above your own</li>
                        <li>Seek a therapist (last resort)</li>
                    </ul>
                </div>
                <div className="info-card right down">
                    <p className="info-large-header">Warning signs of isolation</p>
                    <ul>
                        <li>Loss of loved ones</li>
                        <li>Mental health issues</li>
                        <li>Social Media</li>
                        <li>Unemployment</li>
                        <li>Anxiety</li>
                        <li>Shyness</li>
                    </ul>
                </div>
                <div className="info-card right down">
                    <p className="info-large-header">Difficulties caused by isolation</p>
                    <ul>
                        <li>Depression </li>
                        <li>Poor sleep quality</li>
                        <li>Higher risks for health problems</li>
                        <li>Unemployment</li>
                        <li>Anxiety</li>
                        <li>Panic attacks</li>
                        <li>Suicidal thoughts</li>
                    </ul>
                </div>
            
            <div className="bottom-text">
                <h2>Feeling like you need to talk?</h2>
                <p>Check out our chat page or click here: <Link to={{pathname: "/chats"}} style={{
                    color: "#000"
                }}>Chat</Link></p>
            </div>
        </div>
    );
}