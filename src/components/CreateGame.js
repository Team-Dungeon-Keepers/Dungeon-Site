import React from 'react';
import { NavBar } from './NavBar';
import '../styles/creategame.css';
import axios from 'axios';

function CreateGame (){

    function test() {
        alert("Submission not completed");
    }
    function step1To2() {
        let step1Right = document.getElementById('step1Right');
        let step2Right = document.getElementById('step2Right');
        step1Right.style.display = "none";
        step2Right.style.display = "grid";
    }
    function renderPage2() {
        getAllanguages();
    }
    const getAllanguages = () => {
        axios
          .get('https://dungeon-site-api.herokuapp.com/api/language')
          .then((res) => {
              console.log(res.data);
              languageLoop(res.data);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
    function languageLoop(res) {
        let i = 0;
        var languageDrop = document.getElementById("gameLanguage");
        while (i < res.length) {
            console.log(res[i].language+" ----- GOOOOOMMMMBAAAAA");
            let gameDropOption = document.createElement("option");
            let gameDropValue = res[i].language;
            gameDropOption.innerHTML = gameDropValue;
            gameDropOption.setAttribute("id", gameDropValue);
            languageDrop.appendChild(gameDropOption);
            i++;
        }
    }

    function renderPage3() {
        alert("Test");
    }
    function step1To3() {
        let step1Right = document.getElementById('step1Right');
        let step3Right = document.getElementById('step3Right');
        step1Right.style.display = "none";
        step3Right.style.display = "grid";
    }
    function step2To1() {
        let step1Right = document.getElementById('step1Right');
        let step2Right = document.getElementById('step2Right');
        step2Right.style.display = "none";
        step1Right.style.display = "grid";
    }
    function step2To3() {
        let step3Right = document.getElementById('step3Right');
        let step2Right = document.getElementById('step2Right');
        step2Right.style.display = "none";
        step3Right.style.display = "grid";
        getAllanguages();
    }
    function step3To1() {
        let step1Right = document.getElementById('step1Right');
        let step3Right = document.getElementById('step3Right');
        step3Right.style.display = "none";
        step1Right.style.display = "grid";
    }
    function step3To2() {
        let step3Right = document.getElementById('step3Right');
        let step2Right = document.getElementById('step2Right');
        step3Right.style.display = "none";
        step2Right.style.display = "grid";
    }
    function gID(elementId) {
        let elementFound = document.getElementById(elementId);
        return elementFound
    }
    function test() {
        let gameType = gID("gameType").value;
        let gameTitle = gID("createGameTitle").value;
        let gameDesc = gID("createGameDescription").value;
        let gamePrivacy= gID("createGamePrivacy").value;
        let createGameJoinPolicy = gID("createGameJoinPolicy").value;
        let gameLanguage = gID("gameLanguage").value;
        let createGameMeetType = gID("createGameMeetType").value;
        let gameTags = gID("gameTags").value;
        let createGameAttachedLink = gID("createGameAttachedLink").value;
        let createdGame = {
            gameType:gameType,
            gameTitle:gameTitle,
            gameDesc:gameDesc,
            gamePrivacy:gamePrivacy,
            createGameJoinPolicy:createGameJoinPolicy,
            gameLanguage:gameLanguage,
            createGameMeetType:createGameMeetType,
            gameTags:gameTags,
            createGameAttachedLink:createGameAttachedLink
        }
        alert(JSON.stringify(createdGame));
    }
	 return(
    <div id="createGameContainer">  
        <NavBar /> 
		<div id="createGameTestStuff">
            <div id="createGameLeft">
                <span id="createStep1">Step 1</span>
                <span id="createStep2">Step 2</span>
                <span id="createStep3">Step 3</span>
            </div>
            <div id="createGameRight">
                <div id="step1Right">
                    <div id="step1RightRow1">
                        <span>GAME CREATION</span>
                    </div>
                    <div id="step1RightRow2">
                        <span>Public or Private?</span>
                        <select id="createGamePrivacy">
                            <option value="createPublicGame">Public</option>
                            <option value="createPrivateGame">Private</option>
                        </select>
                    </div>
                    <div id="step1RightRow3">
                        <span>Who Can Join?</span>
                        <select id="createGameJoinPolicy">
                            <option value="createFriendsGame">Friends</option>
                            <option value="createEveryoneGame">Everyone</option>
                        </select>
                    </div>
                    <div id="step1RightRow4">
                        <span>Meeting Type</span>
                        <select id="createGameMeetType">
                            <option value="createGameInPerson">In Person</option>
                            <option value="createGameOnline">Online</option>
                        </select><br/>
                        <button onClick={step1To2}>Next &#8594;</button>
                    </div>
                </div>
                <div id="step2Right">
                    <div id="step2RightRow1">
                        <span>GAME CREATION</span>
                    </div>
                    <div id="step2RightRow2">
                        <span>Game Type:</span>
                        <select id="gameType" name="gameType">
                            <option value="action">Action</option>
                            <option value="rpg">RPG</option>
                            <option value="adventure">Adventure</option>
                        </select>
                    </div>
                    <div id="step2RightRow3">
                        <span>Game Title</span>
                        <input id="createGameTitle"></input>
                    </div>
                    <div id="step2RightRow4">
                        <span>Game Description</span>
                        <input id="createGameDescription"></input>
                    <button onClick={step2To1}>&#8592; Previous</button>
                    <button onClick={step2To3}>Next &#8594;</button>
                    </div>
                </div>
                <div id="step3Right">
                    <span>Language:</span>
                    <select id="gameLanguage" name="gameLanguage">
                    </select>
                    <span>Tags:</span>
                    <select id="gameTags" name="gameTags">
                        <option value="testTag">TestTag</option>
                    </select>
                    <span>Attached Links</span>
                    <input id="createGameAttachedLink" placeholder="https://additionalGameLinks.com"></input>
                    <button onClick={step3To2}>&#8592; Previous</button>
                    <button onClick={test}>Create</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default CreateGame;