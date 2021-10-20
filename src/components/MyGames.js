import React, { Component, useEffect } from 'react';
import { NavBar } from './NavBar';
import '../styles/mygame.css';
import axios from 'axios';

function MyGames (){

    useEffect(() => {
      let userName = localStorage.getItem('userID');
        getAllGames(userName);
      });
    const getAllGames = (userName) => {
        axios
          .get(`https://dungeon-site-api.herokuapp.com/api/games/master/${userName}`)
          .then((res) => {
            renderAllGames(res.data);
          })
          .catch((err) => {
            console.log({err});
            alert(err.response);
          });
    };
    const renderAllGames = (gameStuff) => {
      let myGamesBody = document.getElementById("myGamesTable");
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
        let myGamesNameInput = document.createElement("input");
        let myGamesPassword = document.createElement("td");
        let myGamesPasswordInput = document.createElement("input");
        let myGamesMaster = document.createElement("td");
        let myGamesDesc = document.createElement("td");
        let myGamesDescInput = document.createElement("input");
        let myGamesID = document.createElement("td");
        let myGamesRulesID = document.createElement("td");
        let myGameSaveButton = document.createElement("button");
        let myGameRemoveButton = document.createElement("button");
        let gameID = gameStuff[i].gameID;
        let gameMasterID = gameStuff[i].gameMasterID;
        myGamesRow.setAttribute("id", `tr${i}`);
        myGamesRow.setAttribute("value", gameID);
        myGameSaveButton.innerHTML = "SAVE";
        myGameRemoveButton.innerHTML = "REMOVE";
        myGameSaveButton.addEventListener("click", saveGameChanges);
        myGameSaveButton.setAttribute("value", i);
        myGamesID.setAttribute("value", gameID);
        myGamesID.setAttribute("id", `td${gameID}`);
        myGameRemoveButton.addEventListener("click", removeGameFromList);
        myGameRemoveButton.setAttribute("value", i);
        myGamesNameInput.value = gameStuff[i].gameName;
        myGamesPasswordInput.value = gameStuff[i].gamePassword;
        myGamesMaster.innerHTML = gameMasterID;
        myGamesDescInput.value = gameStuff[i].description;
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
      alert(gameUpdate);
      updateGame(gameUpdate);
    }
    const updateGame = (gameUpdate) => {
        axios
          .put(`https://dungeon-site-api.herokuapp.com/api/games/${gameUpdate.gameID}`, gameUpdate)
          .then((res) => {
            let userName = localStorage.getItem('userID');
            getAllGames(userName);
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
          <table id="myGamesTable">
            <thead id="myGamesTableHead">
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
    )
}
export default MyGames;