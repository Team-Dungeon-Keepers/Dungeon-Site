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
        let myGamesMaster = document.createElement("td");
        let myGamesDesc = document.createElement("td");
        let myGameEditButton = document.createElement("button");
        myGameEditButton.innerHTML = "EDIT";
        myGameEditButton.addEventListener("click", testStuff)
        myGamesName.innerHTML = gameStuff[i].gameName;
        myGamesMaster.innerHTML = gameStuff[i].gamemasterid;
        myGamesDesc.innerHTML = gameStuff[i].description;
        myGamesRow.innerHTML = i;
        myGamesRow.appendChild(myGamesName);
        myGamesRow.appendChild(myGamesMaster);
        myGamesRow.appendChild(myGamesDesc);
        myGamesRow.appendChild(myGameEditButton);
        myGamesBody.appendChild(myGamesRow);
        i++;
      }
    }
    const testStuff = (gamestuff) => {
      gamestuff.preventDefault();
      alert(gamestuff.target.value);
    }
	 return(
    <div id="myGameContainer">  
        <NavBar /> 
        <div id="myGamesBody">
          <table id="myGamesTable">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>GameMaster</th>
              <th>Description</th>
              <th>Buttons</th>
            </tr>
          </table>
        </div>
    </div>
    )
}
export default MyGames;