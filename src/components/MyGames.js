import React, { Component, useEffect } from 'react';
import { NavBar } from './NavBar';
import '../styles/mygame.css';
import axios from 'axios';

function MyGames (){

    useEffect(() => {
        getAllGames();
      });
    const getAllGames = () => {
        axios
          .get('https://dungeon-site-api.herokuapp.com/api/games')
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
        let myGameSaveButton = document.createElement("button");
        let myGameRemoveButton = document.createElement("button");
        myGamesRow.setAttribute("id", `tr${i}`);
        myGameSaveButton.innerHTML = "SAVE";
        myGameRemoveButton.innerHTML = "REMOVE";
        myGameSaveButton.addEventListener("click", saveGameChanges);
        myGameSaveButton.setAttribute("value", i);
        myGameRemoveButton.addEventListener("click", removeGameFromList);
        myGameRemoveButton.setAttribute("value", i);
        myGamesNameInput.value = gameStuff[i].gameName;
        myGamesMasterInput.value = gameStuff[i].gamemasterid;
        myGamesDescInput.value = gameStuff[i].description;
        myGamesRow.innerHTML = i;
        myGamesName.appendChild(myGamesNameInput);
        myGamesMaster.appendChild(myGamesMasterInput);
        myGamesDesc.appendChild(myGamesDescInput);
        myGamesRow.appendChild(myGamesName);
        myGamesRow.appendChild(myGamesMaster);
        myGamesRow.appendChild(myGamesDesc);
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
      rowToRemove.remove();
    }
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
                <th>Buttons</th>
              </tr>
            </thead>
          </table>
        </div>
    </div>
    )
}
export default MyGames;