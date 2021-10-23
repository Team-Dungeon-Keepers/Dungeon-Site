import React, { createElement, useState } from 'react';
import { NavBar } from './NavBar';
import '../styles/findgames.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function FindGames (){

	const [stateID, setStateID] = useState(0); 
	
	const getGamesByID = () =>{
		var id = document.getElementById("findGameByID").value;
		axios
			.get("https://dungeon-site-api.herokuapp.com/api/games/"+id)
			.then((res) => {
				console.log(res.data);
				printGames([res.data]);
			})
			.catch((err) => {
				console.log({err});
			});
	}
	const getGamesByName = () =>{
		var name = document.getElementById("findGameByName").value;
		axios
			.get("https://dungeon-site-api.herokuapp.com/api/games/name/"+name)
			.then((res) => {
				console.log([res.data]);
				printGames(res.data);
			})
			.catch((err) => {
				console.log({err});
			});
	}
	const getGamesByGM = () =>{
		var username = document.getElementById("findGameByGM").value;
		axios
			.get("https://dungeon-site-api.herokuapp.com/api/games/mastername/"+username)
			.then((res) => {
				console.log(res.data);
				printGames(res.data);
			})
			.catch((err) => {
				console.log({err});
			});
	}
	function printGames(data){
		let i = 1;
		console.log("length: "+data.length);
		while (i <= data.length){
			console.log("entered loop");
			var body = document.getElementById("gamesDisplay");
			
			var row = body.insertRow(i-1);
			
			var titleCell = row.insertCell(0);
			var descriptionCell = row.insertCell(1);
			//var playersCell = row.insertCell(2);
			var viewCell = row.insertCell(2);

			titleCell.innerHTML = data[i-1].gameName;
			descriptionCell.innerHTML = data[i-1].description;
			let id = data[i-1].gameID;
			console.log("----------game id is: "+id)
			let viewBtn = document.createElement('button');
			viewBtn.innerHTML="view";
			viewBtn.addEventListener('click', PushToGameView);
			viewBtn.setAttribute('id', i);
			viewBtn.setAttribute('value', id);
			viewCell.appendChild(viewBtn);
			//viewCell.innerHTML = `<button id='viewBtn' class="" onclick='${PushToGameView(id)}'>View</button>`;

			i++;
		}
	}
	let history = useHistory();
	function PushToGameView(targetBtn) {
		let gameView = document.getElementById(targetBtn.target.id)
		setStateID(stateID+targetBtn.target.value);
		console.log("gameView obj: "+gameView);
		console.log("----------here in push function")
		console.log("----------game id is: "+stateID);
		
		history.push({pathname:"/gameview", state:stateID});
	}
	
	 return(
    <div id="findGameContainer">  
        <NavBar /> 
		<div id="findGameBody">
			<span id="findGameHeader">FindGames</span>
			<div id="findGameBodyBody">
				<div id="findGamesLeft">
					<div id="findGameByName-div">
						<input id="findGameByName" placeholder="By Game Name "/>
						<button type="button" id="findGameByName-btn" onClick={getGamesByName}>Go</button>
					</div>
					<div id="findGameByID-div">
						<input id="findGameByID" type="text" placeholder="By Game ID "/>
						<button type="button" id="findGameByID-btn" onClick={getGamesByID}>Go</button>				
					</div>
					<div id="findGameByGM-div">
						<input id="findGameByGM" placeholder="By GameMasters Username"/>
						<button type="button" id="findGameByGM-btn" onClick={getGamesByGM}>Go</button>
					</div>
				</div>
				<div id="findGamesRight">
					<table>
						<tbody id="gamesDisplay">
						</tbody>
					</table>
				</div>
			</div>
		</div>
    </div>
    )
}
export default FindGames;