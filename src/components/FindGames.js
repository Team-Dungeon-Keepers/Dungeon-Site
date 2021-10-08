import React from 'react'
import { NavBar } from './NavBar';
import '../styles/findgames.css'

function FindGames (){
	 return(
    <div id="findGameContainer">  
        <NavBar /> 
		<button id="findGameTestStuff">FindGames</button>
    </div>
    )
}
export default FindGames;