import React from 'react';
import { NavBar } from './NavBar';
import '../styles/findgames.css';
import axios from 'axios';

function FindGames (){

	const getGamesByID = () =>{
		var id = document.getElementById("findGameByID").value;
		axios
			.get("https://dungeon-site-api.herokuapp.com/api/games/"+id)
			.then((res) => {
				console.log(res.data);
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
				console.log(res.data);
			})
			.catch((err) => {
				console.log({err});
			});
	}
	const getGamesByGM = () =>{
		var username = document.getElementById("findGameByGM").value;
		axios
			.get("https://dungeon-site-api.herokuapp.com/api/users/"+username)
			.then((res) => {
				console.log(res.data);
				var gmID = res.data.userID;
				axios
					.get("https://dungeon-site-api.herokuapp.com/api/games/"+gmID)
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log({err});
					});
			})
			.catch((err) => {
				console.log({err});
			});
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
				</div>
			</div>
		</div>
    </div>
    )
}
export default FindGames;