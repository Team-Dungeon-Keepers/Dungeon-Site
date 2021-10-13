import React from 'react';
import { NavBar } from './NavBar';
import '../styles/findgames.css';

function FindGames (){
	 return(
    <div id="findGameContainer">  
        <NavBar /> 
		<div id="findGameBody">
			<span id="findGameHeader">FindGames</span>
			<div id="findGameBodyBody">
			<div id="findGamesLeft">
				<input id="findGameByTitle" placeholder="Enter Game Title Here"/>
				<input id="findGameByID" placeholder="Enter Game ID Here"/>
				<input id="findGameByLink" placeholder="Enter Game Link Here"/>
			</div>
			<div id="findGamesRight">
				<div id="resultsOrSomething">Stuff</div>
				<div id="resultsOrSomething2">MoreStuff</div>
				<div id="resultsOrSomething3">EvenMoreStuff</div>
			</div>
			</div>
		</div>
    </div>
    )
}
export default FindGames;