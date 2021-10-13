import React from 'react'
import { NavBar } from './NavBar';
import '../styles/mygame.css'

function MyGames (){
	 return(
    <div id="myGameContainer">  
        <NavBar /> 
		<button id="myGameTestStuff">MyGames</button>
    </div>
    )
}
export default MyGames;