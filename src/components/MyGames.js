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
      let i = 0;
      while (i < gameStuff.length) {
        let myGamesRow = document.createElement("tr");
        let myGamesName = document.createElement("td");
        let myGamesNameInput = document.createElement("input");
        let myGamesMaster = document.createElement("td");
        let myGamesMasterInput = document.createElement("input");
        let myGamesDesc = document.createElement("td");
        let myGamesDescInput = document.createElement("input");
        let myGamesID = document.createElement("td");
        let myGameSaveButton = document.createElement("button");
        let myGameRemoveButton = document.createElement("button");
        myGamesRow.setAttribute("id", `tr${i}`);
        myGamesRow.setAttribute("value", gameStuff[i].gameID);
        myGameSaveButton.innerHTML = "SAVE";
        myGameRemoveButton.innerHTML = "REMOVE";
        myGameSaveButton.addEventListener("click", saveGameChanges);
        myGameSaveButton.setAttribute("value", i);
        myGamesID.setAttribute("value", gameStuff[i].gameID);
        myGamesID.setAttribute("id", `td${gameStuff[i].gameID}`);
        myGameRemoveButton.addEventListener("click", removeGameFromList);
        myGameRemoveButton.setAttribute("value", i);
        myGamesNameInput.value = gameStuff[i].gameName;
        myGamesMasterInput.value = gameStuff[i].gameMasterID;
        myGamesDescInput.value = gameStuff[i].description;
        myGamesID.innerHTML = gameStuff[i].gameID;
        myGamesRow.innerHTML = i;
        myGamesName.appendChild(myGamesNameInput);
        myGamesMaster.appendChild(myGamesMasterInput);
        myGamesDesc.appendChild(myGamesDescInput);
        myGamesRow.appendChild(myGamesName);
        myGamesRow.appendChild(myGamesMaster);
        myGamesRow.appendChild(myGamesDesc);
        myGamesRow.appendChild(myGamesID);
        myGamesRow.appendChild(myGameSaveButton);
        myGamesRow.appendChild(myGameRemoveButton);
        myGamesBody.appendChild(myGamesRow);
        i++;
      }
    }
    const saveGameChanges = () => {
      alert("Need function to call out update on backend");
    }
    const removeGameFromList = (gameToRemove) => {
      let rowToRemove = document.getElementById(`tr${gameToRemove.target.value}`);
      let gameIdentifier = rowToRemove.childNodes[4].innerHTML;
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
                <th>GameMaster</th>
                <th>Description</th>
                <th>Game ID</th>
                <th>Buttons</th>
              </tr>
            </thead>
          </table>
        </div>
    </div>
    )
}
export default MyGames;