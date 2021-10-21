import React, { createElement } from 'react';
import { NavBar } from './NavBar';
import '../styles/gameView.css';
import axios from 'axios';

function GameView(){

    return (
        <div id="gameViewContainer">
            <NavBar/>
            <div id="gameViewBody">
                <div id="viewFirstRow">
                    <h2>My DnD Acadamia!</h2>
                </div>
                <div id="viewFirstRow">
                    <div id="gameViewBodyRight">
                        <div id="rightTitle">
                            <h3>Details</h3>
                        </div>
                        <div id="description-div">
                            <p id="description">A super cool dnd game i came up with for my friends! Our characters find themselves as part of a school for adventurers, but someone looms in the darkness!</p>
                        </div>
                        <div id="rules-div">
                            <h4>Rules:</h4>
                            <ul id="rules">
                                <li>Dungeons and Drangons: 5th edition</li>
                            </ul>
                        </div>
                        <div id="address-div">
                            <h4>Takes Place:</h4>
                            <p id="address">Class 1A dorm commons</p>
                        </div>
                        <div id="languages-div">
                            <h4>We Speak:</h4>
                            <ul id="languages">
                                <li>Japanese</li>
                                <li>English</li>
                            </ul>
                        </div>
                    </div>
                    <div id="gameViewBodyLeft">
                        <div id="leftTitle">    
                        </div>
                        <div id="gameMaster-div">
                            <h4>Host:</h4>
                            <h3 id="gameMaster">deku</h3>
                        </div>
                        <div id="players-div">
                            <h4>Players:</h4>
                            <ul id="players">
                                <li>xXking_explosn_mudrXx</li>
                                <li>shoto-todoroki</li>
                                <li>redChivalry</li>
                                <li>INGENIUM</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button>Join Game!</button>
            </div>
        </div>
    )
}
export default GameView;