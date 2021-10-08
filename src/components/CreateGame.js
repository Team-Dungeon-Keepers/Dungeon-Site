import React from 'react'
import { NavBar } from './NavBar';
import '../styles/creategame.css'

function CreateGame (){
	 return(
    <div id="createGameContainer">  
        <NavBar /> 
		<button id="createGameTestStuff">CreateGame</button>
    </div>
    )
}
export default CreateGame;