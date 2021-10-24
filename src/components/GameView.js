import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import '../styles/gameView.css';
import axios from 'axios';
import { withRouter } from 'react-router';

function GameView(){

    const [game, setGame] = useState([]);
     const[name, setName] = useState();
     const[desc, setDesc] = useState();
    //  const[gRules, setGRules] = useState();
    //  const[addressL1, setAddressL1] = useState();
    //  const[addressL2, setAddressL2] = useState();
    //  const[times, setTimes] = useState();
    //  const[starts, setStarts] = useState();
    //  const[ends, setEnds] = useState();
    //  const[hRules, setHRules] = useState([]);
    //  const[lang, setLang] = useState([]);
    //  const[gm, setGM] = useState();
    //  const[players, setPlayers] = useState([]);
     // const[id, setID] = useState();

    //setID(sessionStorage.getItem('gameID'));
    //console.log(id);
    //const id = 5//sessionStorage.getItem('gameID')

    const gameObj = {
        id:5,
        name:"",
        desc:"",
        gRules:"",
        addressL1:"",
        addressL2:"",
        times:"",
        starts:"",
        ends:"",
        hRules:[],
        lang:[],
        gm:"",
        players:[]
    }
    
    const id = 5;
    useEffect(() => {
        getGame();
        //console.log('++++++'+gameObj.name);
        setName(gameObj.name);
        setDesc(gameObj.desc);
        console.log("+++++++"+name)
    }, )

    const getGame = async () => {
        try{
            const { data } = await axios.get(`https://dungeon-site-api.herokuapp.com/api/games/full/${id}`);
            //console.log(data.game.gameName);
            gameObj.name = data.game.gameName;
            gameObj.desc = data.game.description;
            gameObj.gRules=data.rulesName;
            gameObj.addressL1=`${data.addresses[0].street}, ${data.addresses[0].apartment}`;
            gameObj.addressL2=`${data.addresses[0].city}, ${data.addresses[0].state}`;
            gameObj.times=`${data.schedules[0].startTime} - ${data.schedules[0].endTime}`;
            gameObj.starts=data.schedules[0].startDate;
            gameObj.ends=data.schedules[0].endDate;
            gameObj.hRules=data.behaviors;
            gameObj.lang=data.languages;
            gameObj.gm=data.languages;
            gameObj.players=data.users;
            
            console.log('------'+gameObj.name);
            console.log('------'+gameObj.desc);
            console.log('------'+gameObj.gRules);
            console.log('------'+gameObj.addressL1);
            console.log('------'+gameObj.addressL2);
            console.log('------'+gameObj.times);
            console.log('------'+gameObj.starts);
            console.log('------'+gameObj.ends);
            console.log('------'+gameObj.hRules);
            console.log('------'+gameObj.lang[0].language);
            console.log('------'+gameObj.gm);
            console.log('------'+gameObj.players);
        }
        catch(error) {
            console.log(error)
        }
	}
    function setStates(data){
        setName(data.game.gameName);
        setDesc(data.game.description);
        // setGRules(data.rulesName);
        // setAddressL1(`${data.addresses[0].street}, ${data.addresses[0].apartment}`);
        // setAddressL2(`${data.addresses[0].city}, ${data.addresses[0].state}`);
        // setTimes(`${data.schedules[0].startTime} - ${data.schedules[0].endTime}`);
        // setStarts(data.schedules[0].startDate);
        // setEnds(data.schedules[0].endTime);
        // setHRules(data.behaviors);
        // setLang(data.languages)
        // setGM(data.gmname);
        // setPlayers(data.users)

        //console.log("set id for gameView: "+id);

    }

    return (
        <div>
            <NavBar/>
            <div id="gameViewContainer">
            <div id="gameViewBody">
                <div id="viewFirstRow">
                    <h1 id="name">{gameObj.name}</h1>
                </div>
                <div id="viewSecondRow">
                    <div id="gameViewBodyRight">
                        <div id="rightTitle">
                            <h4>Details</h4>
                        </div>
                        <div id="description-div">
                            <p id="description">{desc}</p>
                        </div>
                        <div id="gameRules-div">
                            <h4>Game Rules:</h4>
                            <ul id="gameRules">
                                <li>{/*gRules*/}</li>
                            </ul>
                        </div>
                        <div id="address-div">
                            <h4>Takes Place:</h4>
                            <p id="addressL1">{/*addressL1*/}</p>
                            <p id="addressL2">{/*addressL2*/}</p>
                        </div>
                        <div id="schedule-div">
                            <h4 id="times-h">Times:</h4>
                            <p id="times-p">{/*times*/}</p>
                            <h4 id="starts-h">Starts:</h4>
                            <p id="starts-p">{/*starts*/}</p>
                            <h4 id="ends-h">Ends:</h4>
                            <p id="ends-p">{/*ends*/}</p>
                        </div>
                        <div id="houseRules-div">
                            <h4>House Rules:</h4>
                            <ul id="houseRules">
                                {/*hRules.map(rule => (
                                    <li key={rule.behaviorID.toString()}>{rule.behavior}</li>
                                ))*/}
                            </ul>
                        </div>
                        <div id="languages-div">
                            <h4>We Speak:</h4>
                            <ul id="languages">
                                {/*lang.map(language => (
                                    <li key={language.languageID.toString()}>{language.language}</li>
                                ))*/}
                            </ul>
                        </div>
                    </div>
                    <div id="gameViewBodyLeft">
                        <div id="gameMaster-div">
                            <h4>Host:</h4>
                        </div>
                        <div>
                            <h3 id="gameMaster">{/*gm*/}</h3>
                        </div>
                        <div id="players-div">
                            <h4>Players:</h4>
                        </div>
                        <div>
                            <ul id="players">
                            {/*players.map(player => (
                                    <li key={player.username.toString()}>{player.username}</li>
                            ))*/}
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="viewThirdRow">
                    <button id="join-btn">Join Game!</button>
                </div>
            </div>
            </div>
        </div>
    )
}
export default GameView;