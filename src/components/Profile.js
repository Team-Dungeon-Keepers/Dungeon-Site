import React, { useEffect } from 'react'
import '../styles/profile.css';
import { connect } from 'react-redux'
import { NavBar } from './NavBar'
import axios from 'axios';

function ProfileEdit() {

    useEffect(() => {
        let userName = localStorage.getItem('userID');
        getUserInfo(userName);
        getGMGames(userName, 0);
        getGMGames(userName, 1);
    });
    function getUserInfo(userID) {
        axios
            .get(`https://dungeon-site-api.herokuapp.com/api/users/${userID}`)
            .then((res) => {
                renderUserInformation(res.data);
            })
            .catch((err) => {
                console.log({err});
                alert(err.response.data.message);
            });
    }
    const getGMGames = (userName, gmOrNah) => {
        var aPIAddress;
        if (gmOrNah == 0) { aPIAddress = `https://dungeon-site-api.herokuapp.com/api/games/master/${userName}` }
        else if (gmOrNah == 1) { aPIAddress = `https://dungeon-site-api.herokuapp.com/api/games/user/${userName}` }
        else {alert("error"); }
        axios
          .get(aPIAddress)
          .then((res) => {
            renderAllGames(res.data, gmOrNah);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
    const renderAllGames = (gameStuff, craigFactor) => {
        if (craigFactor === 0) {
          var myGamesBody = document.getElementById("profileGMGamesTable");
        } else { var myGamesBody = document.getElementById("profilePlayerGamesTable"); }
        if (myGamesBody.children.length > 1) {
          let i = 1;
          while (i < myGamesBody.children.length) {
            myGamesBody.lastChild.remove();
          }
        }
        let i = 0;
        while (i < gameStuff.length) {
          let myGamesRow = document.createElement("tr");
          let myGamesName = document.createElement("td");
          let myGamesNameInput = document.createElement("span");
          let myGameSaveButton = document.createElement("button");
          let myGameRemoveButton = document.createElement("button");
          let gameID = gameStuff[i].gameID;
          myGamesRow.setAttribute("id", `tr${i}`);
          myGamesRow.setAttribute("value", gameID);
          myGameSaveButton.innerHTML = "SAVE";
          myGameRemoveButton.innerHTML = "LEAVE";
          //myGameSaveButton.addEventListener("click", saveGameChanges);
          myGameSaveButton.setAttribute("value", i);
          //myGameRemoveButton.addEventListener("click", removeGameFromList);
          myGameRemoveButton.setAttribute("value", i);
          myGamesNameInput.innerHTML = gameStuff[i].gameName;
          myGamesRow.innerHTML = i;
          myGamesName.appendChild(myGamesNameInput);
          myGamesRow.appendChild(myGamesName);
          myGamesRow.appendChild(myGameSaveButton);
          myGamesRow.appendChild(myGameRemoveButton);
          myGamesBody.appendChild(myGamesRow);
          i++;
        }
    }
    function renderUserInformation(userInformation) {
        let welcomeUser = document.getElementById("profileBodyContainerRightWelcome");
        let welcomeUserData = welcomeUser.innerHTML;
        console.log(welcomeUser);
        console.log(userInformation.username);
        welcomeUser.innerHTML = welcomeUserData.concat(` ${userInformation.username}`);
    }
    return (
        <div id="profileContainer">
            <NavBar />
            <div id="profileBody">
                <div id="profileBodyContainer">
                    <div id="profileBodyContainerLeft">
                        <div id="profileBodyContainerLeftTop"></div>
                        <div id="profileBodyContainerLeftBottom"></div>
                    </div>
                    <div id="profileBodyContainerRight">
                        <div id="profileBodyContainerRight1">
                            <div id="profileBodyContainerRightWelcomeContainer">
                                <span id="profileBodyContainerRightWelcome">Welcome</span>
                            </div>
                        </div>
                        <div id="profileBodyContainerRight2">
                            <span>Games Joined</span>
                            <table id="profilePlayerGamesTable">
                            <thead id="profilePlayerGamesTableHead">
                                <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Buttons</th>
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <div id="profileBodyContainerRight3">
                            <span>Game Master List</span>
                            <table id="profileGMGamesTable">
                            <thead id="profileGMGamesTableHead">
                                <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Buttons</th>
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <div id="profileBodyContainerRight4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
