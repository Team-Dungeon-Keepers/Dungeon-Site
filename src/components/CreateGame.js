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
        getAllRules();
        getAllCategories();
        getAllBehaviors();
    }
    const getAllanguages = () => {
        axios
          .get('https://dungeon-site-api.herokuapp.com/api/language')
          .then((res) => {
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
        if (languageDrop.hasChildNodes) {
            while (languageDrop.children.length > 0) {
                languageDrop.lastChild.remove();
            }
        }
        while (i < res.length) {
            let gameDropOption = document.createElement("option");
            let gameDropValue = res[i].language;
            gameDropOption.innerHTML = gameDropValue;
            gameDropOption.setAttribute("id", gameDropValue);
            gameDropOption.setAttribute("value", gameDropValue);
            languageDrop.appendChild(gameDropOption);
            i++;
        }
    }
    const getAllRules = () => {
        axios
          .get('https://dungeon-site-api.herokuapp.com/api/rules')
          .then((res) => {
            ruleLoop(res.data);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
    function ruleLoop(res) {
        let i = 0;
        var ruleDrop = document.getElementById("gameRules");
        if (ruleDrop.hasChildNodes) {
            while (ruleDrop.children.length > 0) {
                ruleDrop.lastChild.remove();
            }
        }
        while (i < res.length) {
            let gameDropOption = document.createElement("option");
            let gameDropValue = res[i].rulesName;
            gameDropOption.innerHTML = gameDropValue;
            gameDropOption.setAttribute("id", gameDropValue);
            gameDropOption.setAttribute("value", gameDropValue);
            ruleDrop.appendChild(gameDropOption);
            i++;
        }
    }
    const getAllCategories = () => {
        axios
          .get('https://dungeon-site-api.herokuapp.com/api/category')
          .then((res) => {
            categoryLoop(res.data);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
    function categoryLoop(res) {
        let i = 0;
        let categoryDrop = document.getElementById("gameType");
        if (categoryDrop.hasChildNodes) {
            while (categoryDrop.children.length > 0) {
                categoryDrop.lastChild.remove();
            }
        }
        while (i < res.length) {
            let gameDropOption = document.createElement("option");
            let gameDropValue = res[i].name;
            gameDropOption.innerHTML = gameDropValue;
            gameDropOption.setAttribute("id", gameDropValue);
            gameDropOption.setAttribute("value", gameDropValue);
            categoryDrop.appendChild(gameDropOption);
            i++;
        }
    }
    const getAllBehaviors = () => {
        axios
          .get('https://dungeon-site-api.herokuapp.com/api/behavior')
          .then((res) => {
            behaviorLoop(res.data);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
    function behaviorLoop(res) {
        let i = 0;
        let behaviorDrop = document.getElementById("gameBehavior");
        if (behaviorDrop.hasChildNodes) {
            while (behaviorDrop.children.length > 0) {
                behaviorDrop.lastChild.remove();
            }
        }
        while (i < res.length) {
            let gameDropOption = document.createElement("option");
            let gameDropValue = res[i].behavior;
            gameDropOption.innerHTML = gameDropValue;
            gameDropOption.setAttribute("id", gameDropValue);
            gameDropOption.setAttribute("value", gameDropValue);
            behaviorDrop.appendChild(gameDropOption);
            i++;
        }
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
    function step3To2() {
        let step3Right = document.getElementById('step3Right');
        let step2Right = document.getElementById('step2Right');
        step3Right.style.display = "none";
        step2Right.style.display = "grid";
        getAllRules();
        getAllCategories();
        getAllBehaviors();
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
        let gameLanguage = gID("createGameAddedLanguages").innerHTML;
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
    function addLanguageToGame() {
        let languageToAdd = document.getElementById("gameLanguage").value;
        let languageBox = document.getElementById("createGameAddedLanguages");
        if (languageBox.innerHTML.indexOf(languageToAdd) == -1) {
            languageBox.innerHTML += ("; "+languageToAdd);
        }
    }
    function removeLanguageFromGame() {
        let languageToAdd = document.getElementById("gameLanguage").value;
        let languageBox = document.getElementById("createGameAddedLanguages");
        if (languageBox.innerHTML.indexOf(languageToAdd) !== -1) {
            languageBox.innerHTML = languageBox.innerHTML.replace(`; ${languageToAdd}`, " ");
            console.log(languageBox.innerHTML);
        }
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
                        <span>Game Title</span>
                        <input id="createGameTitle"></input>
                    </div>
                    <div id="step1RightRow3">
                        <span>Game Password</span>
                        <input id="createGamePassword"></input>
                    </div>
                    <div id="step1RightRow4">
                        <span>Game Description</span>
                        <input id="createGameDescription"></input>
                    </div>
                    <div id="step1RightRow5">
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
                        </select>
                    </div>
                    <div id="step2RightRow3">
                        <span>Game Rules:</span>
                        <select id="gameRules" name="gameRules">
                        </select>
                    </div>
                    <div id="step2RightRow4">
                        <span>Game Behavior:</span>
                        <select id="gameBehavior" name="gameBehavior">
                        </select>
                    </div>
                    <div id="step2RightRow5">
                        <button onClick={step2To1}>&#8592; Previous</button><br/>
                        <button onClick={step2To3}>Next &#8594;</button>
                    </div>
                </div>
                <div id="step3Right">
                    <div id="step3RightRow1">
                        <span>Language:</span>
                    </div>
                    <div id="step3RightRow2">
                        <select id="gameLanguage" name="gameLanguage">
                        </select>
                        <button id="createGameAddLanguage" onClick={addLanguageToGame}>ADD</button>
                        <button id="createGameRemoveLanguage" onClick={removeLanguageFromGame}>REMOVE</button>
                        <span id="createGameAddedLanguages">English</span>
                    </div>
                    <div id="step3RightRow3">
                        <span>Tags:</span>
                        <select id="gameTags" name="gameTags">
                            <option value="testTag">TestTag</option>
                        </select>
                    </div>
                    <div id="step3RightRow4">
                        <span>Attached Links</span>
                        <input id="createGameAttachedLink" placeholder="https://additionalGameLinks.com"></input>
                    </div>
                    <div id="step3RightRow5">
                        <button onClick={step3To2}>&#8592; Previous</button><br/>
                        <button onClick={test}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default CreateGame;