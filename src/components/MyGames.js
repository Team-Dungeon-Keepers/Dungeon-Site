import React, { Component, useEffect } from 'react';
import { NavBar } from './NavBar';
import '../styles/mygame.css';
import axios from 'axios';

function MyGames (){

    useEffect(() => {
      let userName = localStorage.getItem('userID');
        getGMGames(userName, 0);
        getGMGames(userName, 1);
    });
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
        var myGamesBody = document.getElementById("myGMGamesTable");
      } else { var myGamesBody = document.getElementById("myPlayerGamesTable"); }
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
        let myGamesPassword = document.createElement("td");
        let myGamesPasswordInput = document.createElement("span");
        let myGamesMaster = document.createElement("td");
        let myGamesDesc = document.createElement("td");
        let myGamesDescInput = document.createElement("span");
        let myGamesID = document.createElement("td");
        let myGamesRulesID = document.createElement("td");
        let myGameSaveButton = document.createElement("button");
        let myGameRemoveButton = document.createElement("button");
        let gameID = gameStuff[i].gameID;
        let gameMasterID = gameStuff[i].gameMasterID;
        myGamesRow.setAttribute("id", `tr${i}`);
        myGamesRow.setAttribute("value", gameID);
        myGameSaveButton.innerHTML = "SAVE";
        myGameRemoveButton.innerHTML = "LEAVE";
        myGameSaveButton.addEventListener("click", saveGameChanges);
        myGameSaveButton.setAttribute("value", i);
        myGamesID.setAttribute("value", gameID);
        myGamesID.setAttribute("id", `td${gameID}`);
        myGameRemoveButton.addEventListener("click", removeGameFromList);
        myGameRemoveButton.setAttribute("value", i);
        myGamesNameInput.innerHTML = gameStuff[i].gameName;
        myGamesPasswordInput.innerHTML = gameStuff[i].gamePassword;
        myGamesMaster.innerHTML = gameMasterID;
        myGamesDescInput.innerHTML = gameStuff[i].description;
        myGamesID.innerHTML = gameID;
        myGamesRulesID.innerHTML = gameStuff[i].rulesID;
        myGamesRow.innerHTML = i;
        myGamesName.appendChild(myGamesNameInput);
        myGamesPassword.appendChild(myGamesPasswordInput);
        myGamesDesc.appendChild(myGamesDescInput);
        myGamesRow.appendChild(myGamesName);
        myGamesRow.appendChild(myGamesPassword);
        myGamesRow.appendChild(myGamesMaster);
        myGamesRow.appendChild(myGamesDesc);
        myGamesRow.appendChild(myGamesID);
        myGamesRow.appendChild(myGamesRulesID);
        myGamesRow.appendChild(myGameSaveButton);
        myGamesRow.appendChild(myGameRemoveButton);
        myGamesBody.appendChild(myGamesRow);
        i++;
      }
    }
    const saveGameChanges = (gameToRemove) => {
      let rowToRemove = document.getElementById(`tr${gameToRemove.target.value}`);
      let gameName = rowToRemove.childNodes[1].childNodes[0].value;
      let gamePassword = rowToRemove.childNodes[2].childNodes[0].value;
      let gameMaster = rowToRemove.childNodes[3].innerHTML;
      let gameDesc = rowToRemove.childNodes[4].childNodes[0].value;
      let gameID = rowToRemove.childNodes[5].innerHTML;
      let ruleID = rowToRemove.childNodes[6].innerHTML;
      var gameUpdate = {
          gameID: gameID,
          gamemasterid: gameMaster,
          gameName: gameName,
          gamePassword: gamePassword,
          rulesID: ruleID,
          description: gameDesc
      };
      updateGame(gameUpdate);
    }
    const updateGame = (gameUpdate) => {
        axios
          .put(`https://dungeon-site-api.herokuapp.com/api/games/${gameUpdate.gameID}`, gameUpdate)
          .then((res) => {
            let userName = localStorage.getItem('userID');
            getGMGames(userName);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
    const removeGameFromList = (gameToRemove) => {
      let rowToRemove = document.getElementById(`tr${gameToRemove.target.value}`);
      let gameIdentifier = rowToRemove.childNodes[5].innerHTML;
      deleteGame(gameIdentifier);
      rowToRemove.remove();
    }
    const deleteGame = (gameIdentifier) => {
        axios
          .delete(`https://dungeon-site-api.herokuapp.com/api/games/${gameIdentifier}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
	 return(
    <div id="myGameContainer">  
        <NavBar /> 
        <div id="myGamesBody">
          <div id="gameMasterTableContainer">
            <span>Game Master List</span>
            <table id="myGMGamesTable">
              <thead id="myGMGamesTableHead">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>GameMaster</th>
                  <th>Description</th>
                  <th>Game ID</th>
                  <th>Rules ID</th>
                  <th>Buttons</th>
                </tr>
              </thead>
            </table>
          </div>
          <div id="playerTableContainer">
            <span>Game Player List</span>
            <table id="myPlayerGamesTable">
              <thead id="myPlayerGamesTableHead">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>GameMaster</th>
                  <th>Description</th>
                  <th>Game ID</th>
                  <th>Rules ID</th>
                  <th>Buttons</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
    </div>
    )
}
export default MyGames;