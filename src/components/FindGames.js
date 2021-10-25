import React, { createElement, useRef, useState } from 'react';
import { NavBar } from './NavBar';
import '../styles/findgames.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GameViewButton from './GameViewButton';

function FindGames (){

	const [gameID, setGameID] = useState()
	const [gameName, setGameName] = useState();
	const [gmUser, setGmUser] = useState();
	const [gameDesc, setGameDesc] = useState();
	const [games, setGames] = useState([]);

	const display = useRef();
	//const gamesArr = [];
	

	const handleIdChange = (event) => {
		setGameID(event.target.value)
	}

	const handleGameNameChange = (event) => {
		setGameName(event.target.value)
	}

	const handleGMChange = (event) => {
		setGmUser(event.target.value)
	}
	
	const getGamesByID = async () => {
		try{
			const { data } = await axios.get(`https://dungeon-site-api.herokuapp.com/api/games/${gameID}`)
			console.log("======"+{gameID});
			setGames( arr => [...arr, data]);
			games.map(game => (console.log(game.gameID)));

			//printGames(gamesArr);
		}
		catch(error) {
			console.log(error)
		}
	}
	const getGamesByName = async () =>{
		try{
			const { data } = await axios.get(`https://dungeon-site-api.herokuapp.com/api/games/name/${gameName}`)
			console.log(data);
			setGames( arr => [...arr, data]);
			//printGames([data]);
		}
		catch(error) {
			console.log(error)
		}
	}
	const getGamesByGM = async () =>{
		try{
			const { data } = await axios.get(`https://dungeon-site-api.herokuapp.com/api/games/mastername/${gmUser}`)
			console.log(data);
			setGames(data);
			//printGames([data]);
		}
		catch(error) {
			console.log(error)
		}
	}
	/*
	function printGames(data){
		setGames(data);
		console.log("======== game: "+games);
		console.log("======== gameName: "+data[0].gameName);
		console.log("======== length: "+data.length);
		gameItems = data.map(game => (
			<tr>
				<td>{game.gameName}</td>
				<td>{game.description}</td>
			</tr>
		));
		console.log("======== items: "+gameItems.length);
	}
	*/
	let history = useHistory();
	function PushToGameView(targetBtn) {
		let gameView = document.getElementById(targetBtn.target.id)
		setGameID(gameID+targetBtn.target.value);
		console.log("gameView obj: "+gameView);
		console.log("----------here in push function")
		console.log("----------game id is: "+gameID);
		
		history.push({pathname:"/gameview", state:gameID});
	}
	
	 return(
    <div id="findGameContainer">  
        <NavBar /> 
		<div id="findGameBody">
			<span id="findGameHeader">FindGames</span>
			<div id="findGameBodyBody">
				<div id="findGamesLeft">
					<div id="findGameByName-div">
						<input id="findGameByName" placeholder="By Game Name " onChange={handleGameNameChange}/>
						<button type="button" id="findGameByName-btn" onClick={() => getGamesByName()}>Go</button>
					</div>
					<div id="findGameByID-div">
						<input id="findGameByID" type="text" placeholder="By Game ID " onChange={handleIdChange}/>
						<button type="button" id="findGameByID-btn" onClick={() => getGamesByID()}>Go</button>				
					</div>
					<div id="findGameByGM-div">
						<input id="findGameByGM" placeholder="By GameMasters Username"onChange={handleGMChange}/>
						<button type="button" id="findGameByGM-btn" onClick={() => getGamesByGM()}>Go</button>
					</div>
				</div>
				<div id="findGamesRight">
					<table id="gamesDisplay" ref={display}>
						<tbody>
							{games.map(game => (
								<tr key={game.gameID.toString()}>
									<td>{game.gameName}</td>
									<td>{game.description}</td>
									<td><GameViewButton gameID={game.gameID}></GameViewButton></td>
								</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
    </div>
    )
}
export default FindGames;