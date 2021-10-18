import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import '../styles/dashboard.css'
import axiosWithAuth from '../utils/axiosWithAuth';
import { loginAsManager } from '../utils/authUtils';
import { NavBar } from './NavBar';
import { LanguageCheckBox } from './LanguageCheckBox';

function Dashboard(props) { 
    const {trigger, setTrigger} = props;
    const history = useHistory();
    const testLang = {languageid: 1, language: "English"};

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
                <img id="dashBoardBackground" useMap="#dashBoard"></img>
                    <map name="dashBoard">
                        <area shape="rect" coords="324,68,521,263" onClick={goToCreateGame}></area>
                        <area shape="rect" coords="541,68,740,263" onClick={goToMyGames}></area>
                        <area shape="rect" coords="758,68,956,263" onClick={goToFindGames}></area>
                        <area shape="rect" coords="325,283,956,382" onClick={goToCompendium}></area>
                    </map>
		    </div>
    </div>
    )
}

export default Dashboard;
