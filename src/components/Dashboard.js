import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import '../styles/dashboard.css'
import axiosWithAuth from '../utils/axiosWithAuth';
import { loginAsManager } from '../utils/authUtils';
import { NavBar } from './NavBar';

function Dashboard(props) { 
    const {trigger, setTrigger} = props;
    const history = useHistory();

	const goToCreateGame = () => {
        history.push("/creategame");
	}
	const goToMyGames = () => {
        history.push("/mygames");
	}
	const goToFindGames = () => {
        history.push("/findgames");
	}
	const goToCompendium = () => {
        history.push("/compendium");
	}

    let { userID } = useParams();

    useEffect(()=> {
        if ((userID == null) || (!loginAsManager())) 
            userID = localStorage.getItem('userID');
        
    }, [trigger])

    return(
    <div id="dashBoardContainer">  
            <NavBar /> 
            <div id="dashBoardBody">
                <button id="dashBoardCreateGames" onClick={goToCreateGame}>CreateGames</button>
                <button id="dashBoardMyGames" onClick={goToMyGames}>MyGames</button>
                <button id="dashBoardFindGames" onClick={goToFindGames}>FindGames</button>
                <button id="dashBoardCompendium" onClick={goToCompendium}>Compendium</button>
		    </div>
    </div>
    )
}

export default Dashboard;
