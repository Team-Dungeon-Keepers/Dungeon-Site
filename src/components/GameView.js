import React, { createElement } from 'react';
import { NavBar } from './NavBar';
import '../styles/gameView.css';
import axios from 'axios';

function GameView(){

    function getGame() {
		//var id = document.getElementById("findGameByID").value;
		axios
			.get("https://dungeon-site-api.herokuapp.com/api/games/full/5")
			.then((res) => {
				console.log(res.data);
                printView(res.data);
			})
			.catch((err) => {
				console.log({err});
			});
	}
    function printView(data){
        console.log(data);

        let name = document.getElementById("name");
        let desc = document.getElementById("description");
        let gRules = document.getElementById("gameRules");
        let addressL1 = document.getElementById("addressL1");
        let addressL2 = document.getElementById("addressL2");
        let times = document.getElementById("times-p");
        let starts = document.getElementById("starts-p");
        let ends = document.getElementById("ends-p");
        //include loop for multiple entries
        let hRules = document.getElementById("houseRules");
        //include loop for multiple entries
        let lang = document.getElementById("languages");
        let gm = document.getElementById("gameMaster");
        //include loop for multiple entries
        let players = document.getElementById("players");

        name.innerHTML=data.game.gameName;
        
        desc.innerHTML=data.game.description;
        
        gRules.innerHTML=data.rulesName;
        
        var addressString1=`${data.addresses[0].street}, ${data.addresses[0].apartment} `;
        //var state = JSON.stringify(data.addresses[0].state);
        //var stateUpper = state.toUpperCase;
        var addressString2=`${data.addresses[0].city}, ${data.addresses[0].state} `;
        addressL1.innerHTML=addressString1;
        addressL2.innerHTML=addressString2;
        
        times.innerHTML=`${data.schedules[0].startTime} - ${data.schedules[0].endTime}`;
        starts.innerHTML=data.schedules[0].startDate;
        ends.innerHTML=data.schedules[0].endDate;

        
        for(var i=0;i<data.behaviors.length;i++){
            console.log("-----started loop");
            var li=document.createElement("li");
            li.innerHTML=data.behaviors[i].behavior;
            hRules.appendChild(li);
        }
        for(var i=0;i<data.languages.length;i++){
            console.log("-----started loop");
            var li=document.createElement("li");
            li.innerHTML=data.languages[i].language;
            lang.appendChild(li);
        }

        gm.innerHTML=data.gmname;

        for(var i=0;i<data.users.length;i++){
            console.log("-----started loop");
            var li=document.createElement("li");
            li.innerHTML=data.users[i].username;
            players.appendChild(li);
        }
        
    }

    return (
        <div onLoad={getGame()}>
            <NavBar/>
            <div id="gameViewContainer">
            
            <div id="gameViewBody">
                <div id="viewFirstRow">
                    <h1 id="name">change me!</h1>
                </div>
                <div id="viewSecondRow">
                    <div id="gameViewBodyRight">
                        <div id="rightTitle">
                            <h4>Details</h4>
                        </div>
                        <div id="description-div">
                            <p id="description">change me!</p>
                        </div>
                        <div id="gameRules-div">
                            <h4>Game Rules:</h4>
                            <ul id="gameRules">
                                <li>change me!</li>
                            </ul>
                        </div>
                        <div id="address-div">
                            <h4>Takes Place:</h4>
                            <p id="addressL1">change me!</p>
                            <p id="addressL2">change me!</p>
                        </div>
                        <div id="schedule-div">
                            <h4 id="times-h">Times:</h4>
                            <p id="times-p">change me!</p>
                            <h4 id="starts-h">Starts:</h4>
                            <p id="starts-p">change me!</p>
                            <h4 id="ends-h">Ends:</h4>
                            <p id="ends-p">change me!</p>
                        </div>
                        <div id="houseRules-div">
                            <h4>House Rules:</h4>
                            <ul id="houseRules">
                            </ul>
                        </div>
                        <div id="languages-div">
                            <h4>We Speak:</h4>
                            <ul id="languages">
                            </ul>
                        </div>
                    </div>
                    <div id="gameViewBodyLeft">
                        <div id="gameMaster-div">
                            <h4>Host:</h4>
                        </div>
                        <div>
                            <h3 id="gameMaster">change me!</h3>
                        </div>
                        <div id="players-div">
                            <h4>Players:</h4>
                        </div>
                        <div>
                            <ul id="players">
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="viewThirdRow">
                    <button id="join-btn">Join Game!</button>
                </div>
            </div>
            </div>
        </div>
    )
}
export default GameView;