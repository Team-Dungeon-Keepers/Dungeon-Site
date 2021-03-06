import React, { useState } from 'react';
import { NavBar } from './NavBar';
import { useHistory } from 'react-router-dom';
import '../styles/creategame.css';
import axios from 'axios';

function CreateGame (){
    let [form, setForm] = useState({});
    let [rules, setRules] = useState([]);
	let history = useHistory(); 
    function findRulesID(string) {
        let ruleFound = rules.filter((item) => {
            return item.rulesName == string;
        })

        return ruleFound[0].rulesid;
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
            setRules(res.data);
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
    
    function stepTo1() {
        let step1Right = document.getElementById('step1Right');
        let step2Right = document.getElementById('step2Right');
        let step3Right = document.getElementById('step3Right');
        step3Right.style.display = "none";
        step2Right.style.display = "none";
        step1Right.style.display = "grid";
    }
    function stepTo3() {
        let step3Right = document.getElementById('step3Right');
        let step2Right = document.getElementById('step2Right');
        let step1Right = document.getElementById('step1Right');
        step1Right.style.display = "none";
        step2Right.style.display = "none";
        step3Right.style.display = "grid";
        getAllanguages();
    }
    function stepTo2() {
        let step3Right = document.getElementById('step3Right');
        let step2Right = document.getElementById('step2Right');
        let step1Right = document.getElementById('step1Right');
        step1Right.style.display = "none";
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

    function MakeGameFull() {
        let gameName = gID("createGameTitle").value;
        let gameDesc = gID("createGameDescription").value;
        let gamePassword= gID("createGamePassword").value;
        let createGameRulesString = gID("createGameAddedRules").innerHTML;
        let gameLanguage = gID("createGameAddedLanguages").innerHTML;
        let languageStrings = gameLanguage.split('; ');
        let createGameBehavior = gID("createGameAddedBehaviors").innerHTML;
        let gameBehaviorStrings = createGameBehavior.split('; ');
        let gameStreetAddress = gID("createGameStreetAddress").value;
        let gameAptAddress = gID("createGameAptAddress").value;
        let gameCityAddress = gID("createGameCityAddress").value;
        let gameStateAddress = gID("createGameStateAddress").value;
        let gameZipAddress = gID("createGameZipAddress").value;
        let createGameAttachedLink = gID("createGameAttachedLink").value;
        let createGameLinkDescription = gID("createGameLinkDescription").value;
        let createGameDateStart = gID("createGameDateStart").value;
        let createGameTimeStart = gID("createGameTimeStart").value;
        let createGameDateEnd = gID("createGameDateEnd").value;
        let createGameTimeEnd = gID("createGameTimeEnd").value;
        let gmID = localStorage.getItem("userID");

        let gameBehaviorList = [
            {
                behaviorid: 0,
                behavior: gameBehaviorStrings[0]
            }
        ]

        let languageList = [{
            languageid: 0,
            language: languageStrings[0]
        }]
        
        let createGameRules = findRulesID(createGameRulesString);

        let createdGame = {
            "game": {
                "gameID": 0,
                "gameMasterID": gmID,
                "gameName": gameName,
                "gamePassword": gamePassword,
                "rulesID": createGameRules,
                "description": gameDesc
            },
            "addresses": [
                {
                    "addressID": 0,
                    "street": gameStreetAddress,
                    "apartment": gameAptAddress,
                    "city": gameCityAddress,
                    "state": gameStateAddress,
                    "zip": gameZipAddress
                }
            ],
            "behaviors": gameBehaviorList,
            "languages": languageList,
            "links": [
                {
                    linkID: 0,
                    url: createGameAttachedLink,
                    description: createGameLinkDescription
                }
            ],
            "schedules": [
                {
                    "scheduleID": 0,
                    "startTime": createGameTimeStart,
                    "endTime": createGameTimeEnd,
                    "startDate": createGameDateStart,
                    "endDate": createGameDateEnd
                }
            ]
        }
        console.log(JSON.stringify(createdGame));
        sendCreateGameData(createdGame);
		history.push("/dashboard");
    }

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        const updateData = (type === 'checkbox')?checked:value;
        setForm({...form, [name]: updateData});
    }
 
    function sendCreateGameData(createdGame) {
        axios
        .post('https://dungeon-site-api.herokuapp.com/api/games/full', createdGame)
        .then((res) => {
            console.log("res===================="+res);
            console.log("res.data===================="+res.data);
			alert("Game Successfully created");
        })
        .catch((err) => {
          console.log({err});
          alert("Game creation failed!");
		  return;
        });
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
            languageBox.innerHTML = languageBox.innerHTML.replace(`${languageToAdd}; `, "");
            languageBox.innerHTML = languageBox.innerHTML.replace(`${languageToAdd}`, "");
        }
    }
    function addBehaviorToGame() {
        let behaviorToAdd = document.getElementById("gameBehavior").value;
        let behaviorBox = document.getElementById("createGameAddedBehaviors");
        if (behaviorBox.innerHTML.indexOf(behaviorToAdd) == -1) {
            behaviorBox.innerHTML += ("; "+behaviorToAdd);
        }
    }
    function removeBehaviorFromGame() {
        let behaviorToAdd = document.getElementById("gameBehavior").value;
        let behaviorBox = document.getElementById("createGameAddedBehaviors");
        if (behaviorBox.innerHTML.indexOf(behaviorToAdd) !== -1) {
            behaviorBox.innerHTML = behaviorBox.innerHTML.replace(`; ${behaviorToAdd}`, " ");
            behaviorBox.innerHTML = behaviorBox.innerHTML.replace(`${behaviorToAdd}; `, "");
            behaviorBox.innerHTML = behaviorBox.innerHTML.replace(`${behaviorToAdd}`, "");
        }
    }
    function addRuleToGame() {
        let ruleToAdd = document.getElementById("gameRules").value;
        let ruleBox = document.getElementById("createGameAddedRules");
        if (ruleBox.innerHTML.indexOf(ruleToAdd) == -1) {
            ruleBox.innerHTML = (ruleToAdd);
        }
    }
    function removeRuleFromGame() {
        let ruleToAdd = document.getElementById("gameRules").value;
        let ruleBox = document.getElementById("createGameAddedRules");
        if (ruleBox.innerHTML.indexOf(ruleToAdd) !== -1) {
            ruleBox.innerHTML = ruleBox.innerHTML.replace(`; ${ruleToAdd}`, " ");
            ruleBox.innerHTML = ruleBox.innerHTML.replace(`${ruleToAdd}; `, "");
            ruleBox.innerHTML = ruleBox.innerHTML.replace(`${ruleToAdd}`, "");
        }
    }
    
    function addTypeToGame() {
        let typeToAdd = document.getElementById("gameType").value;
        let typeBox = document.getElementById("createGameAddedTypes");
        if (typeBox.innerHTML.indexOf(typeToAdd) == -1) {
            if (typeBox.innerHTML != "") {
                typeBox.innerHTML += "; ";
            }
            typeBox.innerHTML += (typeToAdd);
        }
    }
    function removeTypeFromGame() {
        let typeToAdd = document.getElementById("gameType").value;
        let typeBox = document.getElementById("createGameAddedTypes");
        if (typeBox.innerHTML.indexOf(typeToAdd) !== -1) {
            typeBox.innerHTML = typeBox.innerHTML.replace(`; ${typeToAdd}`, " ");
            typeBox.innerHTML = typeBox.innerHTML.replace(`${typeToAdd}; `, "");
            typeBox.innerHTML = typeBox.innerHTML.replace(`${typeToAdd}`, "");
        }
    }
    function dateTest() {
        let dateData = document.getElementById("createGameDateStart").value;
        console.log(dateData);
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
                        <button onClick={stepTo2}>Next &#8594;</button>
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
                        <button id="createGameAddType" onClick={addTypeToGame}>+</button>
                        <button id="createGameRemoveType" onClick={removeTypeFromGame}>_</button>
                        <span id="createGameAddedTypes">Video Game</span>
                    </div>
                    <div id="step2RightRow3">
                        <span>Game Rules:</span>
                        <select id="gameRules" name="gameRules">
                        </select>
                        <button id="createGameAddRule" onClick={addRuleToGame}>+</button>
                        <button id="createGameAddRule" onClick={removeRuleFromGame}>_</button>
                        <span id="createGameAddedRules">Pathfinder</span>
                    </div>
                    <div id="step2RightRow4">
                        <span>Game Behavior:</span>
                        <select id="gameBehavior" name="gameBehavior">
                        </select>
                        <button id="createGameAddBehavior" onClick={addBehaviorToGame}>+</button>
                        <button id="createGameRemoveBehavior" onClick={removeBehaviorFromGame}>-</button>
                        <span id="createGameAddedBehaviors">Be on time</span>
                    </div>
                    <div id="step2RightRow5">
                        <button onClick={stepTo1}>&#8592; Previous</button><br/>
                        <button onClick={stepTo3}>Next &#8594;</button>
                    </div>
                </div>
                <div id="step3Right">
                    <div id="step3RightRow1">
                        <span>GAME CREATION</span>
                    </div>
                    <div id="step3RightRow2">
                        <span>Language:</span>
                        <select id="gameLanguage" name="gameLanguage">
                        </select>
                        <button id="createGameAddLanguage" onClick={addLanguageToGame}>+</button>
                        <button id="createGameRemoveLanguage" onClick={removeLanguageFromGame}>-</button>
                        <span id="createGameAddedLanguages">English</span>
                    </div>
                    <div id="step3RightRow3">
                        <span>Address:</span><br/>
                        <span>Street</span>
                        <input placeholder="7234 Example Lane" id="createGameStreetAddress"></input>
                        <span>APT/Unit</span>
                        <input placeholder="32A"id="createGameAptAddress"></input>
                        <span>City</span>
                        <input placeholder="Virginia City"id="createGameCityAddress"></input>
                        <span>State</span>
                        <select placeholder="VA"id="createGameStateAddress">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        <span>Zip Code</span>
                        <input placeholder="89440" type="number"id="createGameZipAddress"></input>
                    </div>
                    <div id="step3RightRow4">
                        <span>Attached Links</span>
                        <input id="createGameAttachedLink" placeholder="https://additionalGameLinks.com"></input><br/>
                        <span>Link Description</span>
                        <input id="createGameLinkDescription" placeholder="Write a small description about the provided link"></input><br/>
                        <span>Game Start Date</span>
                        <input id="createGameDateStart" type="date"></input>
                        <span>Game Start Time</span>
                        <input id="createGameTimeStart" type="time"></input><br/>
                        <span>Game End Date</span>
                        <input id="createGameDateEnd" type="date"></input>
                        <span>Game End Time</span>
                        <input id="createGameTimeEnd" type="time"></input>
                        <button onClick={dateTest}>Date</button>
                    </div>
                    <div id="step3RightRow5">
                        <button onClick={stepTo2}>&#8592; Previous</button><br/>
                        <button onClick={MakeGameFull}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateGame;