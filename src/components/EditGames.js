import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { NavBar } from './NavBar';
import '../styles/creategame.css';
import axios from 'axios';
import { UPDATE_SCHEDULE } from '../actions/ScheduleActions';

function EditGames(gameID) {
    var game;
    var addresses;
	var schedules;
	var users;
	var languages;
	var links;
    let history = useHistory();
	//copied from taelor's findGames, should set game to current game via gameID
    const getGameByID = () => {
        axios.get("https://dungeon-site-api.herokuapp.com/api/games/" + gameID)
            .then((res) => {
                console.log(res.data);
                game = [
                    [res.data]
                ];
                console.log(game);
            })
            .catch((err) => {
                console.log({ err });
            });
    }
	//same idea as above, thanks to mike for the backend api hookup
    function getAddresses() {
        axios.get("https://dungeon-site-api.herokuapp.com/api/address/game/" + gameID)
            .then((res) => {
                console.log(res.data);
                addresses = [
                    [res.data]
                ];
                console.log(addresses);
            })
            .catch((err) => {
                console.log({ err });
            });
    }
	//TODO setup axios
	//same idea as above, thanks to mike for the backend api hookup
	function getSchedules() {
        axios.get("https://dungeon-site-api.herokuapp.com/api/schedule/game/" + gameID)
            .then((res) => {
                console.log(res.data);
                schedules = [
                    [res.data]
                ];
                console.log(schedules);
            })
            .catch((err) => {
                console.log({ err });
            });
    }
	//TODO setup axios
	function getUsers() {
        axios.get("https://dungeon-site-api.herokuapp.com/api//" + gameID)
            .then((res) => {
                console.log(res.data);
                users = [
                    [res.data]
                ];
                console.log(game);
            })
            .catch((err) => {
                console.log({ err });
            });
	}
	//TODO setup axios
	function getLinks() {
        axios.get("https://dungeon-site-api.herokuapp.com/api//" + gameID)
            .then((res) => {
                console.log(res.data);
                links = [
                    [res.data]
                ];
                console.log(game);
            })
            .catch((err) => {
                console.log({ err });
            });
	}
	//TODO setup axios
	function getLanguages() {
        axios.get("https://dungeon-site-api.herokuapp.com/api//" + gameID)
            .then((res) => {
                console.log(res.data);
                languages = [
                    [res.data]
                ];
                console.log(game);
            })
            .catch((err) => {
                console.log({ err });
            });
	}
	function newSchedule()
	{
		var temp;
		let nSchedule = {
			scheduleID : 0,
			startTime : "00:00",
			endTime : "00:00",
			startDate : "01/01/1990",
			endDate : "01/01/1990",
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/schedules/",
			headers: {}, 
			data: nSchedule
		  }).then((res) => {
			temp = res.scheduleID;
			console.log(res.scheduleID);
			schedules.push(res);
		})
		.catch((err) => {
			console.log({ err });
		});
		var nGameSchedule = {
			ID : 0,
			gameID : gameID,
			scheduleID : temp
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/game_schedule/",
			headers: {}, 
			data: nGameSchedule
		  }).then((res) => {
			  console.log(res.scheduleID);
		})
		.catch((err) => {
			console.log({ err });
		});
		getSchedules();
		//schedules.push(nSchedule);
	}
	function newAddress()
	{
		var temp;
		let nAddress = {
			addressID : 0,
			street : "",
			apartment : "",
			city : "",
			state : "",
			zip : 0
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/addresses/",
			headers: {}, 
			data: nAddress
		  }).then((res) => {
			temp = res.addressID;
			console.log(res.addressID);
		})
		.catch((err) => {
			console.log({ err });
		});
		var nGameAddress = {
			ID : 0,
			gameID : gameID,
			addressID : temp
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/game_address/",
			headers: {}, 
			data: nGameAddress
		  }).then((res) => {
			console.log(res.addressID);
		})
		.catch((err) => {
			console.log({ err });
		});
		//getAddresses();
	}
	function editGame()
	{
		
	}
	function editAddress(ID)
	{
		let i = 0;
		let bool = 0;
		let street = document.getElementById("street:"+ID).value;
		let apartment = document.getElementById("apartment:"+ID).value;
		let city = document.getElementById("city:"+ID).value;
		let state = document.getElementById("state:"+ID).value;
		let zip = document.getElementById("zip:"+ID).value;
		for(;i<addresses.length;i++)
		{
			if(addresses[i].addressID==ID)
			{
				if((addresses[i].street == street || street == "")&&
				   (addresses[i].apartment == apartment || apartment == "")&&
				   (addresses[i].city == city || city == "")&&
				   (addresses[i].state == state || state == "")&&
				   (addresses[i].zip == zip || zip === null))
				{
					alert("Nothing was changed");
					return;
				}
				addresses[i].street = street;
				addresses[i].apartment = apartment;
				addresses[i].city = city;
				addresses[i].state = state;
				addresses[i].zip = zip;
				bool = 1;
				break;
			}
		}
		//the ID was never found in the list of addresses, implying it was deleted but also somehow loaded?
		if(bool == 0)
		{
			alert("invalid address selected");
			//return to dashboard?
			history.push("/dashboard");
			return;
		}
		/*var nAddress = {
			addressID : ID,
			street : street,
			apartment : apartment,
			city : city,
			state : state,
			zip : zip
		}*/
		axios({
			method: 'put',
			url: "https://dungeon-site-api.herokuapp.com/api/addresses/"+ID,
			headers: {}, 
			data: addresses[i]
		  });
		alert("Schedule:" + ID + " changes saved");
	}
	function editSchedule(ID)
	{
		let i = 0;
		let bool = 0;
		let startDate = document.getElementById("startDate:"+ID).value;
		let endDate = document.getElementById("endDate:"+ID).value;
		let startTime = document.getElementById("startTime:"+ID).value;
		let endTime = document.getElementById("endTime:"+ID).value;
		//verification
		if(startDate>endDate)
		{
			alert("Start Date is later than End Date");
			return;
		}
		if((startTime>endTime)&&(startDate==endDate))
		{
			alert("Start Time is later than End Time on the same day");
			return;
		}
		for(; i<schedules.length; i++)
		{
			//find the ID in the list of schedules
			if(schedules[i].scheduleID == ID)
			{
				//check if nothing was changed or things were set to null
				if((schedules[i].startTime == startTime || startTime == "")&&
				(schedules[i].endTime == endTime || endTime == "")&&
				(schedules[i].endDate == endDate || endDate == "")&&
				(schedules[i].startDate == startDate || startDate == ""))
				{
					alert("Nothing was changed");
					return;
				}
				//if something was changed, set everything to the new values
				schedules[i].startTime = startTime;
				schedules[i].endTime = endTime;
				schedules[i].endDate = endDate;
				schedules[i].startDate = startDate;
				bool = 1;
				break;
			}
		}
		//the ID was never found in the list of schedules, implying it was deleted but also somehow loaded?
		if(bool == 0)
		{
			alert("invalid schedule selected");
			//return to dashboard?
			history.push("/dashboard");
			return;
		}
		//actual update here
		/*var nSchedule = {
			scheduleID : ID,
			startDate : startDate,
			endDate : endDate,
			startTime : startTime,
			endTime : endTime
		}*/
		axios({
			method: 'put',
			url: "https://dungeon-site-api.herokuapp.com/api/schedules/"+ID,
			headers: {}, 
			data: schedules[i]
		  })
		//schedules[i] = nSchedule;
		alert("Schedule:" + ID + " changes saved");
	}
	function verify()
	{
		if(game.gameMasterID!=localStorage.getItem('userID'))
		{
			console.log("userID:" + localStorage.getItem('userID'));
			console.log("gameMasterID:" + game.gameMasterID);
			alert("You aren't the game master, you cannot edit this game");
			//return to home?
			history.push("/dashboard");
		}
	}
	
	function printGameData()
	{
		//document.getElementById('gameDataDisplay').innerHTML = "";
		let str = "";
		//TODO: finish this, and make dropdown for game master? Even though it'll revoke editing privillages?
		str += `<div>
				<h2> Game: `+game.gameID+`</h2>
				</div>`;
		document.getElementById('gameDataDisplay').innerHTML = str;
	}
	function printScheduleData()
	{
		let str = "<h3>Schedule(s)</h3>";
		if(schedules.length == 0)
		{
			str += `<p>There are no schedules associated with this game!</p>`;
		}
		else
		{
			//getting today's date
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth() + 1; //January is 0!
			let yyyy = today.getFullYear();
			if (dd < 10) 
			{
			   dd = '0' + dd;
			}
			
			if (mm < 10) 
			{
			   mm = '0' + mm;
			}
			today = yyyy + '-' + mm + '-' + dd;
			//actual start to printing stuff
			for(let i = 0; i<schedules.length; i++)
			{
				//for each of the things, print their current times, set min to today for dates if possible
				str += `<div>
						<p> Schedule: `+ schedules[i].scheduleID +`</p>
						<label for= "startDate:`+ schedules[i].scheduleID +`"> Start Date </label>
						<input type="date" id= "startDate:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].startDate +`" min = `+today+`>
						<label for= "endDate:`+ schedules[i].scheduleID +`"> End Date </label>
						<input type="date" id= "endDate:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].startDate +`" min = `+today+`>
						<br>
						<label for= "startTime:`+ schedules[i].scheduleID +`"> Start Time </label>
						<input type="time" id= "startTime:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].startTime +`>
						<label for= "endTime:`+ schedules[i].scheduleID +`"> End Time </label>
						<input type="time" id= "endTime:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].endTime +`>
						<br>
						<button onClick={()=>editSchedule(`+schedules[i].scheduleID+`)}>Save edits to schedule</button>
				        </div>`;
			}
		}
		str += `<button onClick={()=>newSchedule()}>Add a new schedule</button>`;
		document.getElementById('scheduleDataDisplay').innerHTML = str;
	}
	//utility method for forcing zipcodes to be numeric or null
	function formatNumeric(num) 
	{
		num = num.toString().replace(/\.|\,/g,'');
		if(isNaN(num) || num === "")
			return null;
		return num*1;
	}
	function printAddressData()
	{
		let str = "<h3>Address(es)</h3>";
		if(addresses.length==0)
		{
			str += `<p>There are no addresses associated with this game!</p>`;
		}
		else
		{
			for(let i = 0; i<addresses.length; i++)
			{
				str += `<div>
						<p> Address: `+ addresses[i].addressID +`</p>
						<label for="street:`+addresses[i].addressID+`">
						<input type="text" id= "street:`+addresses[i].addressID+`" value = "`+addresses[i].street+`">
						<br>
						<label for="apartment:`+addresses[i].addressID+`">
						<input type="text" id= "apartment:`+addresses[i].addressID+`" value = "`+addresses[i].apartment+`">
						<br>
						<label for="city:`+addresses[i].addressID+`">
						<input type="text" id= "city:`+addresses[i].addressID+`" value = "`+addresses[i].city+`">
						<br>
						<label for="state:`+addresses[i].addressID+`">
						<input type="text" id= "state:`+addresses[i].addressID+`" value = "`+addresses[i].state+`">
						<br>
						<label for="zip:`+addresses[i].addressID+`">
						<input type="text" id= "zip:`+addresses[i].addressID+`" value = "`+addresses[i].zip+`" onBlur="this.value=formatNumeric(this.value)">
						<br>
						<button onClick={()=>editAddress(`+addresses[i].addressID+`)}>Save edits to schedule</button>
						</div>`;
			}
		}
		str += `<button onClick={()=>newAddress()}>Add a new Address</button>`;
		document.getElementById('gameDataDisplay').innerHTML = str;
	}
	useEffect(() =>
	{
		getGameByID();
		console.log(game);
		verify();
		getAddresses();
		console.log(addresses);
		getSchedules();
		console.log(schedules);
		//getUsers();
		//console.log(users);
		printGameData();
		printAddressData();
		printScheduleData();
		//printUserData();
	});
    return ( 
		<div id = "editGameContainer" >
        	<NavBar />
			<div id = "gameDataDisplay">
			</div>
			<div id = "userDataDisplay">
			</div>
			<div id = "addressDataDisplay">
			</div>
			<div id = "scheduleDataDisplay">
			</div>
			<div id = "languageDataDisplay">
			</div>
			<div id = "linkDataDisplay">
			</div>
        </div>
    )
}
export default EditGames;