import React from 'react'
import { NavBar } from './NavBar';
import '../styles/compendium.css'

function Compendium (){
	 return(
    <div id="compendiumContainer">  
        <NavBar /> 
		<button id="compendiumTestStuff">CompendiumStuff</button>
    </div>
    )
}
export default Compendium;