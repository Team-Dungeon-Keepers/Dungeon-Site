import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from './NavBar';
import '../styles/creategame.css';
import axios from 'axios';

function EditGames(props) {
	var gameID = props.id;
	//maybe use states?
    var game;
    var addresses;
	var behaviors;
	var gmName;
	var languages;
	var links;
	var rulesName;
	var schedules;
	var users;
	var behaviorList;
	var languageList;
	var rulesList;
    let history = useHistory();
    const getGameDataByID = () => {
        axios.get("https://dungeon-site-api.herokuapp.com/api/games/full/" + gameID)
            .then((res) => {
                console.log(res.data);
                game = res.data.game;
				addresses = res.data.addresses;
				behaviors = res.data.behaviors;
				gmName = res.data.gmName;
				languages = res.data.languages;
				links = res.data.links;
				rulesName = res.data.rulesName;
				schedules = res.data.schedules;
				users = res.data.users;
                console.log(game);
            })
            .catch((err) => {
                console.log({ err });
				alert("Game not found!");
            });
		axios.get("https://dungeon-site-api.herokuapp.com/api/behavior")
            .then((res) => {
				behaviorList = res.data;
			})
            .catch((err) => {
                console.log({ err });
				alert("Connection issue!");
            });
		axios.get("https://dungeon-site-api.herokuapp.com/api/language")
			.then((res) => {
				languageList = res.data;
			})
			.catch((err) => {
				console.log({ err });
				alert("Connection issue!");
			});
		axios.get("https://dungeon-site-api.herokuapp.com/api/rules")
			.then((res) => {
				rulesList = res.data;
			})
			.catch((err) => {
				console.log({ err });
				alert("Connection issue!");
			});
    }
	function newBehavior()
	{
		let i = 0;
		let behaviorID = document.getElementById("behaviors").value;
		let bool = 0;
		for(; i<behaviorList.length; i++)
		{
			if(behaviorList[i].behaviorID == behaviorID)
			{
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("Invalid behavior selected");
			return;
		}
		let nBehavior = {
			ID : 0,
			gameID : gameID,
			behaviorID : behaviorID
		}
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/game_behavior/",
			headers: {}, 
			data: nBehavior
		  }).then((res) => {
			schedules.push(behaviorList[i]);
			printBehaviorData();
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed");
			return;
		});
	}
	function deleteBehavior()
	{
		let i = 0;
		let behaviorID = document.getElementById("delBehaviors").value;
		let bool = 0;
		for(; i<behaviorList.length; i++)
		{
			if(behaviorList[i].behaviorID == behaviorID)
			{
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("Invalid behavior selected");
			return;
		}
		let oBehavior = {
			ID : 0,
			gameID : gameID,
			behaviorID : behaviorID
		}
		axios({
			method: 'delete',
			url: "https://dungeon-site-api.herokuapp.com/api/game_behavior/",
			headers: {}, 
			data: oBehavior
		  }).then((res) => {
			alert("Behavior deleted");
			behaviors.splice(i,1);
			printBehaviorData();
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed");
			return;
		});
	}
	function newLanguage()
	{
		let i = 0;
		let languageID = document.getElementById("languages").value;
		let bool = 0;
		for(; i<languageList.length; i++)
		{
			if(languageList[i].languageid == languageID)
			{
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("Invalid language selected");
			return;
		}
		let nLanguage = {
			ID : 0,
			gameID : gameID,
			languageID : languageID
		}
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/game_language/",
			headers: {}, 
			data: nLanguage
		  }).then((res) => {
			languages.push(languageList[i]);
			printLanguageData();
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed");
			return;
		});
	}
	function deleteLanguage()
	{
		let i = 0;
		let languageID = document.getElementById("delLanguages").value;
		let bool = 0;
		for(; i<languageList.length; i++)
		{
			if(languageList[i].languageid == languageID)
			{
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("Invalid language selected");
			return;
		}
		let oLanguage = {
			ID : 0,
			gameID : gameID,
			languageID : languageID
		}
		axios({
			method: 'delete',
			url: "https://dungeon-site-api.herokuapp.com/api/game_language/",
			headers: {}, 
			data: oLanguage
		  }).then((res) => {
			alert("Language deleted");
			languages.splice(i,1);
			printLanguageData();
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed");
			return;
		});
	}
	//the rest of these should be 
	function newLink()
	{
		//recheck files to see if change in linkid capitalization
		let temp;
		let nLink = {
			linkid : 0,
			url : "",
			description : ""
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/links/",
			headers: {}, 
			data: nLink
		  }).then((res) => {
			temp = res.data.linkid;
			console.log(res.data.linkid);
			links.push(res.data);
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed");
			return;
		});
		var nGameLink = {
			ID : 0,
			gameID : gameID,
			linkID : temp
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/game_link/",
			headers: {}, 
			data: nGameLink
			}).then((res) => {
			  console.log(res.data.ID);
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed in relationship marking, please contact customer support");
			return;
		});
		if(links.length == 1)
		{
			document.getElementById('linkDataDisplay').innerHTML = "";
		}
		//note: change textarea rows/cols if needed, text area is merely for thing looking better, if needed, change to input
		document.getElementById('linkDataDisplay').innerHTML += 
			`<div id= "link:`+temp+`">
				<p> Link: `+ temp +`</p>
				<label for= "url:`+ temp +`"> URL </label>
				<input type="text" id= "url:`+ temp +`" value = "">
				<label for= "description:`+ temp +`"> description </label>
				<textarea type="text" rows="3" cols="50" class = "form-control" id="description:`+ temp +`" ></textarea>
				<br>
				<button onClick={()=>editLink(`+temp+`)}>Save edits to link</button>
			</div>`;
	}
	function deleteLink(ID)
	{
		let bool = 0;
		let i = 0;
		for(; i<links.length; i++)
		{
			if(ID == links[i].linkid)
			{
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("Link already removed");
			return;
		}
		axios({
			method: 'delete',
			url: "https://dungeon-site-api.herokuapp.com/api/links/"+ID
		  }).then((res) => {
			alert("Link:"+ID+" deleted");
			links.splice(i,1);
			document.getElementById("link:"+ID).innerHTML = "";
			return;
		})
		.catch((err) => {
			console.log({ err });
			alert("deletion failed");
			return;
		});
	}
	function newSchedule()
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
		var temp;
		let nSchedule = {
			scheduleID : 0,
			startTime : "00:00:00",
			endTime : "00:00:00",
			startDate : today,
			endDate : today,
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/schedules/",
			headers: {}, 
			data: nSchedule
		  }).then((res) => {
			temp = res.data.scheduleID;
			console.log(res.data.scheduleID);
			schedules.push(res.data);
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed");
			return;
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
			  console.log(res.data.scheduleID);
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed in relationship marking, please contact customer support");
			return;
		});
		if(schedules.length == 1)
		{
			document.getElementById('scheduleDataDisplay').innerHTML = "<h3>Schedule(s)</h3>";
		}
		document.getElementById('scheduleDataDisplay').innerHTML += 
			`<div id= "schedule:`+temp+`">
				<p> Schedule: `+ temp +`</p>
				<label for= "startDate:`+ temp +`"> Start Date </label>
				<input type="date" id= "startDate:`+ temp +`" value = "`+ today +`" min = "`+today+`">
				<label for= "endDate:`+ temp +`"> End Date </label>
				<input type="date" id= "endDate:`+ temp +`" value = "`+ today +`" min = "`+today+`">
				<br>
				<label for= "startTime:`+ temp +`"> Start Time </label>
				<input type="time" id= "startTime:`+ temp +`" value = "00:00:00">
				<label for= "endTime:`+ temp +`"> End Time </label>
				<input type="time" id= "endTime:`+ temp +`" value = "00:00:00">
				<br>
				<button onClick={()=>editSchedule(`+temp+`)}>Save edits to schedule</button>
				<button onClick={()=>deleteSchedule(`+temp+`)}>Delete schedule</button>
			</div>`;
	}
	function deleteSchedule(ID)
	{
		let bool = 0;
		let i = 0;
		for(; i<schedules.length; i++)
		{
			if(ID == schedules[i].scheduleID)
			{
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("Schedule already removed");
			return;
		}
		axios({
			method: 'delete',
			url: "https://dungeon-site-api.herokuapp.com/api/schedules/"+ID
		  }).then((res) => {
			alert("Schedule:"+ID+" deleted");
			schedules.splice(i,1);
			document.getElementById("schedule:"+ID).innerHTML = "";
			return;
		})
		.catch((err) => {
			console.log({ err });
			alert("deletion failed");
			return;
		});
	}
	function newAddress()
	{
		var temp;
		let nAddress = {
			addressID : 0,
			street : "Example Street",
			apartment : "",
			city : "DC",
			state : "DC",
			zip : 0
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/addresses/",
			headers: {}, 
			data: nAddress
		  }).then((res) => {
			temp = res.data.addressID;
			console.log(res.data.addressID);
			addresses.push(res.data);
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed");
			return;
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
			console.log(res.data.addressID);
		})
		.catch((err) => {
			console.log({ err });
			alert("Creation failed in relationship marking, please contact customer support");
			return;
		});

		addresses.push(nAddress);
		if(addresses.length==1)
		{
			document.getElementById("addressDataDisplay").innerHTML = "<h3>Address(es)</h3>";
		}
		document.getElementById("addressDataDisplay").innerHTML += 
		`<div id= "address:`+addresses[addresses.length-1].addressID+`">
			<p> Address: `+ addresses[addresses.length-1].addressID +`</p>
			<label for="street:`+addresses[addresses.length-1].addressID+`">
			<input type="text" id= "street:`+addresses[addresses.length-1].addressID+`" value = "`+addresses[addresses.length-1].street+`">
			<br>
			<label for="apartment:`+addresses[addresses.length-1].addressID+`">
			<input type="text" id= "apartment:`+addresses[addresses.length-1].addressID+`" value = "`+addresses[addresses.length-1].apartment+`">
			<br>
			<label for="city:`+addresses[addresses.length-1].addressID+`">
			<input type="text" id= "city:`+addresses[addresses.length-1].addressID+`" value = "`+addresses[addresses.length-1].city+`">
			<br>
			<label for="state:`+addresses[addresses.length-1].addressID+`">
			<select id= "state:`+addresses[addresses.length-1].addressID+`" value = "`+addresses[addresses.length-1].state+`">
			<option value="AL">Alabama</option>
			<option value="AK">Alaska</option>
			<option value="AZ">Arizona</option>
			<option value="AR">Arkansas</option>
			<option value="CA">California</option>
			<option value="CO">Colorado</option>
			<option value="CT">Connecticut</option>
			<option value="DE">Delaware</option>
			<option value="DC">District Of Columbia</option>
			<option value="FL">Florida</option>
			<option value="GA">Georgia</option>
			<option value="HI">Hawaii</option>
			<option value="ID">Idaho</option>
			<option value="IL">Illinois</option>
			<option value="IN">Indiana</option>
			<option value="IA">Iowa</option>
			<option value="KS">Kansas</option>
			<option value="KY">Kentucky</option>
			<option value="LA">Louisiana</option>
			<option value="ME">Maine</option>
			<option value="MD">Maryland</option>
			<option value="MA">Massachusetts</option>
			<option value="MI">Michigan</option>
			<option value="MN">Minnesota</option>
			<option value="MS">Mississippi</option>
			<option value="MO">Missouri</option>
			<option value="MT">Montana</option>
			<option value="NE">Nebraska</option>
			<option value="NV">Nevada</option>
			<option value="NH">New Hampshire</option>
			<option value="NJ">New Jersey</option>
			<option value="NM">New Mexico</option>
			<option value="NY">New York</option>
			<option value="NC">North Carolina</option>
			<option value="ND">North Dakota</option>
			<option value="OH">Ohio</option>
			<option value="OK">Oklahoma</option>
			<option value="OR">Oregon</option>
			<option value="PA">Pennsylvania</option>
			<option value="RI">Rhode Island</option>
			<option value="SC">South Carolina</option>
			<option value="SD">South Dakota</option>
			<option value="TN">Tennessee</option>
			<option value="TX">Texas</option>
			<option value="UT">Utah</option>
			<option value="VT">Vermont</option>
			<option value="VA">Virginia</option>
			<option value="WA">Washington</option>
			<option value="WV">West Virginia</option>
			<option value="WI">Wisconsin</option>
			<option value="WY">Wyoming</option>
			</select>
			<br>
			<label for="zip:`+addresses[addresses.length-1].addressID+`">
			<input type="text" id= "zip:`+addresses[addresses.length-1].addressID+`" value = "`+addresses[addresses.length-1].zip+`" onBlur={()=>this.value=formatNumeric(this.value)}>
			<br>
			<button onClick={()=>editAddress(`+addresses[addresses.length-1].addressID+`)}>Save edits to address</button>
			<button onClick={()=>deleteAddress(`+addresses[addresses.length-1].addressID+`)}>Delete address</button>
		</div>`;
		//getAddresses();
	}
	function deleteAddress(ID)
	{
		let bool = 0;
		let i = 0;
		for(; i<addresses.length; i++)
		{
			if(ID == addresses[i].addressID)
			{
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("Address already removed");
			return;
		}
		axios({
			method: 'delete',
			url: "https://dungeon-site-api.herokuapp.com/api/addresses/"+ID
		  }).then((res) => {
			alert("Address:"+ID+" deleted");
			addresses.splice(i,1);
			document.getElementById("address:"+ID).innerHTML = "";
			return;
		})
		.catch((err) => {
			console.log({ err });
			alert("deletion failed");
			return;
		});
	}
	function editGame()
	{
		let password = document.getElementById("gamePassword").value;
		let gameMasterID = document.getElementById("gameMaster").value;
		let rulesID = document.getElementById("rules").value;
		let description = document.getElementById("gameDescription").value;
		let pastGMID = game.gameMasterID;
		if(game.password == password && 
		   game.gameMasterID == gameMasterID &&
		   game.rulesID == rulesID &&
		   game.description == description){
			   alert("Nothing was changed");
			   return;
		   }
		game.password = password;
		game.rulesID = rulesID;
		game.description = description;
		game.gameMasterID = gameMasterID;
		axios({
			method: 'put',
			url: "https://dungeon-site-api.herokuapp.com/api/game/"+gameID,
			headers: {}, 
			data: game
		  }).then((res) => {
			alert("Game changes saved");
			if(pastGMID != gameMasterID)
			{
				refreshThis();
			}
		})
		.catch((err) => {
			console.log({ err });
			alert("Edit failed");
			return;
		});
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
				if(street!="")
					addresses[i].street = street;
				addresses[i].apartment = apartment;
				if(city!="")
					addresses[i].city = city;
				if(state != "")
					addresses[i].state = state;
				if(zip != null)
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
		  }).then((res) => {
			alert("Address:" + ID + " changes saved");
		})
		.catch((err) => {
			console.log({ err });
			alert("Edit failed");
			return;
		});
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
				if(startTime != "")
					schedules[i].startTime = startTime;
				if(endTime != "")
					schedules[i].endTime = endTime;			
				if(endDate != "")
					schedules[i].endDate = endDate;			
				if(startDate != "")
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
		}).then((res) => {
			alert("Schedule:" + ID + " changes saved");
		})
		.catch((err) => {
			console.log({ err });
			alert("Edit failed");
			return;
		});
	}
	function editLink(ID)
	{
		let i = 0;
		let bool = 0;
		let url = document.getElementById("url:"+ID).value;
		let description = document.getElementById("description:"+ID).value;
		for(;i<links.length;i++)
		{
			if(links[i].linkid == ID)
			{
				if((url == "" || links[i].url == url)&&
				   (description == links[i].description))
				{
					alert("Nothing was changed");
					return;
				}
				if(url != "")
					links[i].url = url;
				links[i].description = description;
				bool = 1;
				break;
			}
		}
		if(bool == 0)
		{
			alert("invalid link selected");
			//return to dashboard?
			history.push("/dashboard");
			return;
		}
		axios({
			method: 'put',
			url: "https://dungeon-site-api.herokuapp.com/api/links/"+ID,
			headers: {}, 
			data: links[i]
		  }).then((res) => {
			alert("Link:" + ID + " changes saved");
		})
		.catch((err) => {
			console.log({ err });
			alert("Edit failed");
			return;
		});
	}
	function leaveGame(ID)
	{
		if(game.gameMasterID == ID && users.length > 1)
		{
			alert("Please make someone else game master before leaving!");
			return;
		}
		let userGame = {
			ID : 0,
			userID : ID,
			gameID : gameID
		}
		axios({
			method: 'delete',
			url: "https://dungeon-site-api.herokuapp.com/api/user_game/",
			headers: {}, 
			data: userGame
		}).catch((err) => {
			console.log({ err });
			alert("User removal failed!");
			return;
		});
		for(let i = 0; i<users.length;i++)
		{
			if(users[i].userID == ID)
			{
				users.splice(i,1);
				break;
			}
		}
		//todo: remove the text from userDataDisplay, maybe we gotta make a new div ID for each part?
		if(game.gameMasterID==localStorage.getItem('userID'))
		{
			if(game.gameMasterID == ID)
			{
				axios({
					method: 'delete',
					url: "https://dungeon-site-api.herokuapp.com/api/games/"+gameID
				}).catch((err) => {
					console.log({ err });
					alert("Game deletion failed! Please alert customer support.");
				});
				history.push("/Dashboard");
			}
			else
			{
				document.getElementById('user:'+ID).innerHTML = "";
			}
		}
		else
		{
			//if not, you're joining, append and change the button at the end
			document.getElementById('user:'+ID).innerHTML = "";
			document.getElementById('joinOrLeaveButton').innerHTML =
			`<button onclick={()=>joinGame(`+localStorage.getItem('userID')+`)}>Request To Join Game</button>`;
		}
	}
	//mainly used for invites?
	function joinGameViaUsername(username)
	{
		if((username != gmName) && (game.gamePassword != "" && game.gamePassword != null))
		{
			let pswd = prompt("Please Enter the password to the game:","");
			if(pswd != game.gamePassword)
			{
				alert("Wrong Password");
				return;
			}
		}
		let ID;
		for(let i = 0; i<users.length; i++)
		{
			if(username == users[i].username)
			{
				alert("User:"+username+" is already in the game!");
				return;
			}
		}
		//axios call to make sure the user exists
		axios.get("https://dungeon-site-api.herokuapp.com/api/users/name/"+username)
		.then((res) => {
			users.push(res.data);
			ID = res.data.userID;
		})
		.catch((err) => {
			console.log({ err });
			alert("User does not exist!");
			return;
		});
		let nUserGame = {
			ID : 0,
			userID : ID,
			gameID : game.gameID
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/user_game/",
			headers: {}, 
			data: nUserGame
		}).then((res) => {
		})
		.catch((err) => {
			console.log({ err });
			alert("Relationship creation failed");
			return;
		});
		//if you're the game master using this function, you're already part of the game, so just append and add kick button
		if(game.gameMasterID!=localStorage.getItem('userID'))
		{
			document.getElementById('userDataDisplay').innerHTML += 
					`<p>`+users.length+`: `+users[users.length-1].username+`</p>
					<button type = "button" onClick={()=>leaveGame(`+users[users.length-1].userID+`)}>Kick `+users[users.length-1].username+`</button>
					<br>`;
		}
		else
		{
			//if not, you're joining, append and change the button at the end
			document.getElementById('userDataDisplay').innerHTML += 
					`<p>`+users.length+`: `+users[users.length-1].username+`</p>
					<br>`;
			document.getElementById('joinOrLeaveButton').innerHTML =
			`<button onclick={()=>leaveGame(`+localStorage.getItem('userID')+`)}>Leave Game</button>`;
		}
	}
	function joinGameViaID(ID)
	{
		if((ID != game.gameMasterID) && game.gamePassword != "")
		{
			let pswd = prompt("Please Enter the password to the game:","");
			if(pswd != game.gamePassword)
			{
				alert("Wrong Password");
				return;
			}
		}
		for(let i = 0; i<users.length; i++)
		{
			if(ID == users[i].userID)
			{
				alert("User:"+ID+" is already in the game!");
				return;
			}
		}
		//axios call to make sure the user exists
		axios.get("https://dungeon-site-api.herokuapp.com/api/users/"+ID)
		.then((res) => {
			users.push(res.data);
		})
		.catch((err) => {
			console.log({ err });
			alert("User not found!");
			return;
		});
		let nUserGame = {
			ID : 0,
			userID : ID,
			gameID : game.gameID
		};
		axios({
			method: 'post',
			url: "https://dungeon-site-api.herokuapp.com/api/user_game/",
			headers: {}, 
			data: nUserGame
		}).catch((err) => {
			console.log({ err });
			alert("Relationship creation failed!");
			return;
		});
		//if you're the game master using this function, you're already part of the game, so just append and add kick button
		if(game.gameMasterID!=localStorage.getItem('userID'))
		{
			document.getElementById('userDataDisplay').innerHTML +=
					`<div id = user:`+ID+`>
					<p>`+users.length+`: `+users[users.length-1].username+`</p>
					<button type = "button" onClick={()=>leaveGame(`+users[users.length-1].userID+`)}>Kick `+users[users.length-1].username+`</button>
					</div>`;
		}
		else
		{
			//if not, you're joining, append and change the button at the end
			document.getElementById('userDataDisplay').innerHTML += 
					`<div id = user:`+ID+`>
					<p>`+users.length+`: `+users[users.length-1].username+`</p>
					</div>`;
			document.getElementById('joinOrLeaveButton').innerHTML =
			`<button onclick={()=>leaveGame(`+localStorage.getItem('userID')+`)}>Leave Game</button>`;
		}
	}
	/*function verify()
	{
		if(game.gameMasterID!=localStorage.getItem('userID'))
		{
			console.log("userID:" + localStorage.getItem('userID'));
			console.log("gameMasterID:" + game.gameMasterID);
			alert("You aren't the game master, you cannot edit this game");
			//return to home?
			history.push("/dashboard");
		}
	}*/
	function printUserData()
	{
		let bool = 0;
		let str = "<h3>Player(s)</h3>";
		//users.length shouldn't be == 0, due to the fact that there should be at least 1 person in the game... right?
		if(game.gameMasterID!=localStorage.getItem('userID'))
		{
			for(let i = 0; i<users.length; i++)
			{
				str +=  `<div id = user:`+users[i].userID+`>
						<p>`+(i+1)+`: `+users[i].username+`</p>
						<button type = "button" onClick={()=>leaveGame(`+users[i].userID+`)}>Kick `+users[i].username+`</button>
						</div>`;
				if(localStorage.getItem('userID') == users[i].userID)
				{
					//see if list of players includes the current user
					bool = 1;
				}
			}
		}
		else
		{
			for(let i = 0; i<users.length; i++)
			{
				str += `<div id = user:`+users[i].userID+`>
						<p>`+(i+1)+`: `+users[i].username+`</p>
						</div>`;
				if(localStorage.getItem('userID') == users[i].userID)
				{
					//see if list of players includes the current user
					bool = 1;
				}
			}
		}
		document.getElementById('userDataDisplay').innerHTML = str;
		if(bool == 0)
		{
			//if not, make join game button, note: currently button message is misleading
			document.getElementById('joinOrLeaveButton').innerHTML =
			`<button onclick={()=>joinGame(`+localStorage.getItem('userID')+`)}>Request To Join Game</button>`;
		}
		if(bool == 1)
		{
			//if so, make leave game button
			document.getElementById('joinOrLeaveButton').innerHTML =
			`<button onclick={()=>leaveGame(`+localStorage.getItem('userID')+`)}>Leave Game</button>`;
		}
	}
	function printGameData()
	{
		//document.getElementById('gameDataDisplay').innerHTML = "";
		let str =`<div>
				<h1> Game: `+game.gameName+`</h1>`;
		if(game.gameMasterID == localStorage.getItem('userID'))
		{
			str += `<label for="gamePassword">Password</label>
					<input type="password" id= "gamePassword" value = "`+ game.gamePassword +`">`;
			//gameMaster selection
			str += `<label for="gameMaster">Game Master</label>
					<select id="gameMaster" value = "`+game.gameMasterID+`">`;
			for(let i = 0; i<users.length; i++)
			{
				str+=`<option value="`+users[i].userID+`">`+users[i].username+`</option>`;
			}
			str += `</select>`;
			//rules selection
			str += `<label for="rules"> Ruleset </label>
					<select id="rules" value = "`+game.rulesID+`">`;
			for(let i = 0; i<rulesList.length; i++)
			{
				str+=`<option value="`+rulesList[i].rulesid+`">`+rulesList[i].rulesName+`</option>`;
			}
			str += `</select>`;
			//description section
			str += `<label for="gameDescription"> Description </label>
					<textarea type="text" rows="5" cols="50" class = "form-control" id="gameDescription" >`+game.description+`</textarea>
					<br>
					<button onClick={()=>editGame()}>Save edits to game</button>`;
		}
		else
		{
			str += `<label for="gameMaster">Game Master</label>
					<input type="text" id="gameMaster" value = `+gmName+` readonly>
					<label for="rules">Ruleset</label>
					<input type="text" id="rules" value = `+rulesName+` readonly>
					<label for="gameDescription"> Description </label>
					<textarea type="text" rows="5" cols="50" class = "form-control" id="gameDescription" readonly>`+game.description+`</textarea>`;
		}
		str += `</div>`;
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
			//check once instead of each loop
			if(game.gameMasterID==localStorage.getItem('userID'))
			{
				for(let i = 0; i<schedules.length; i++)
				{
					//for each of the things, print their current times, set min to today for dates if possible
					str += `<div id= "schedule:`+schedules[i].scheduleID+`">
							<p> Schedule: `+ schedules[i].scheduleID +`</p>
							<label for= "startDate:`+ schedules[i].scheduleID +`"> Start Date </label>
							<input type="date" id= "startDate:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].startDate +`" min = "`+today+`">
							<label for= "endDate:`+ schedules[i].scheduleID +`"> End Date </label>
							<input type="date" id= "endDate:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].endDate +`" min = "`+today+`">
							<br>
							<label for= "startTime:`+ schedules[i].scheduleID +`"> Start Time </label>
							<input type="time" id= "startTime:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].startTime +`">
							<label for= "endTime:`+ schedules[i].scheduleID +`"> End Time </label>
							<input type="time" id= "endTime:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].endTime +`">`;
					//inserted chunk for editing
					str += `<br>
						<button onClick={()=>editSchedule(`+schedules[i].scheduleID+`)}>Save edits to schedule</button>
						<button onClick={()=>deleteSchedule(`+schedules[i].scheduleID+`)}>Delete schedule</button>`;
					str += `</div>`;
				}
				document.getElementById('addNewScheduleButton').innerHTML = `<button type="button" onClick={()=>newSchedule()}>Add a new schedule</button>`;
			}
			else
			{
				for(let i = 0; i<schedules.length; i++)
				{
					//for each of the things, print their current times, set min to today for dates if possible
					str += `<div id= "schedule:`+schedules[i].scheduleID+`">
							<p> Schedule: `+ schedules[i].scheduleID +`</p>
							<label for= "startDate:`+ schedules[i].scheduleID +`"> Start Date </label>
							<input type="date" id= "startDate:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].startDate +`" min = "`+today+`" readonly>
							<label for= "endDate:`+ schedules[i].scheduleID +`"> End Date </label>
							<input type="date" id= "endDate:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].endDate +`" min = "`+today+`" readonly>
							<br>
							<label for= "startTime:`+ schedules[i].scheduleID +`"> Start Time </label>
							<input type="time" id= "startTime:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].startTime +` readonly>
							<label for= "endTime:`+ schedules[i].scheduleID +`"> End Time </label>
							<input type="time" id= "endTime:`+ schedules[i].scheduleID +`" value = "`+ schedules[i].endTime +` readonly>
							</div>`;
				}
				document.getElementById('addNewScheduleButton').innerHTML = ``;
			}
		}
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
			if(game.gameMasterID==localStorage.getItem('userID'))
			{
				for(let i = 0; i<addresses.length; i++)
				{
					str += `<div id= "address:`+addresses[i].addressID+`">
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
							<select id= "state:`+addresses[i].addressID+`" value = "`+addresses[i].state+`">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        	</select>
							<br>
							<label for="zip:`+addresses[i].addressID+`">
							<input type="text" id= "zip:`+addresses[i].addressID+`" value = "`+addresses[i].zip+`" onBlur={()=>this.value=formatNumeric(this.value)}>
							<br>
							<button onClick={()=>editAddress(`+addresses[i].addressID+`)}>Save edits to address</button>
							<button onClick={()=>deleteAddress(`+addresses[i].addressID+`)}>Delete address</button>
							</div>`;
				}
				document.getElementById('addNewAddressButton').innerHTML = `<button onClick={()=>newAddress()}>Add a new Address</button>`;
			}
			else
			{
				//state is now set to an text instead of dropdown
				for(let i = 0; i<addresses.length; i++)
				{
					str += `<div id= "address:`+addresses[i].addressID+`">
							<p> Address: `+ addresses[i].addressID +`</p>
							<label for="street:`+addresses[i].addressID+`">
							<input type="text" id= "street:`+addresses[i].addressID+`" value = "`+addresses[i].street+`" readonly>
							<br>
							<label for="apartment:`+addresses[i].addressID+`">
							<input type="text" id= "apartment:`+addresses[i].addressID+`" value = "`+addresses[i].apartment+`" readonly>
							<br>
							<label for="city:`+addresses[i].addressID+`">
							<input type="text" id= "city:`+addresses[i].addressID+`" value = "`+addresses[i].city+`" readonly>
							<br>
							<label for="state:`+addresses[i].addressID+`">
							<input type="text" id= "state:`+addresses[i].addressID+`" value = "`+addresses[i].state+`" readonly>
							<br>
							<label for="zip:`+addresses[i].addressID+`">
							<input type="text" id= "zip:`+addresses[i].addressID+`" value = "`+addresses[i].zip+`" onBlur={()=>this.value=formatNumeric(this.value)} readonly>
							</div>`;
				}
				document.getElementById('addNewAddressButton').innerHTML = ``;
			}
		}
		document.getElementById('addressDataDisplay').innerHTML = str;
	}
	function printLinkData()
	{
		let str = "<h3>Link(s)</h3>";
		if(links.length==0)
		{
			str += `<p>There are no links associated with this game!</p>`;
		}
		else
		{
			if(game.gameMasterID==localStorage.getItem('userID'))
			{
				for(let i = 0; i<links.length; i++)
				{
					str += `<div id= "link:`+links[i].linkid+`">
								<p> Link: `+ links[i].linkid +`</p>
								<label for= "url:`+ links[i].linkid +`"> URL </label>
								<input type="text" id= "url:`+ links[i].linkid +`" value = "`+links[i].url+`">
								<label for= "description:`+ links[i].linkid +`"> description </label>
								<textarea type="text" rows="3" cols="50" class = "form-control" id="description:`+ links[i].linkid +`" >`+links[i].description+`</textarea>
								<br>
								<button onClick={()=>editLink(`+links[i].linkid+`)}>Save edits to link</button>
								<br>
							</div>`;
				}
				document.getElementById('addNewLinkButton').innerHTML = `<button onClick={()=>newLink()}>Create New Link</button>`;
			}
			else
			{
				for(let i = 0; i<links.length; i++)
				{
					str += `<div id= "link:`+links[i].linkid+`">
								<p> Link: `+ links[i].linkid +`</p>
								<label for= "url:`+ links[i].linkid +`"> URL </label>
								<input type="text" id= "url:`+ links[i].linkid +`" value = "`+links[i].url+`" readonly>
								<label for= "description:`+ links[i].linkid +`"> description </label>
								<textarea type="text" rows="3" cols="50" class = "form-control" id="description:`+ links[i].linkid +`" readonly>`+links[i].description+`</textarea>
								<br>
							</div>`;
				}
				document.getElementById('addNewLinkButton').innerHTML = ``;
			}
		}
		document.getElementById('linkDataDisplay').innerHTML = str;
	}
	function printBehaviorData()
	{
		let str = `<h3>Behavior(s):</h3>
					<p> Included behavior(s):`;
		let str2 = `<label for="behaviors">Behavior to add</label>
					<select id="behaviors" placeholder="behaviors">`;
		let str3 = `<label for="delBehaviors">Behavior to remove</label>
					<select id="delBehaviors" placeholder="behaviors">`;
		for(let i = 0; i<behaviorList.length;i++)
		{
			if(behaviors.includes(behaviorList[i]))
			{
				str += `\n` +behaviorList[i].behavior;
				str3 +=`<option value="`+behaviorList[i].behaviorID+`">`+behaviorList[i].behavior+`</option>`;
			}
			else
			{
				str2 +=`<option value="`+behaviorList[i].behaviorID+`">`+behaviorList[i].behavior+`</option>`;
			}
		}
		str += `</p>`;
		str2 += `</select>
				<button onClick={()=>newBehavior()}>Save new behavior</button>`;
		str3 += `</select>
				<button onClick={()=>deleteBehavior()}>Remove behavior</button>`;
		if(game.gameMasterID==localStorage.getItem('userID'))
		{
			document.getElementById('behaviorDataDisplay').innerHTML = str+str2+str3;
		}
		else
		{
			document.getElementById('behaviorDataDisplay').innerHTML = str;
		}
	}
	function printLanguageData()
	{
		let str = `<h3>Language(s):</h3>
					<p>Included Language(s):`;
		let str2 = `<label for="languages">Language to add</label>
					<select id="languages" placeholder="languages">`;
		let str3 = `<label for="delLanguages">Language to remove</label>
					<select id="delLanguages" placeholder="languages">`;
		for(let i = 0; i<languageList.length;i++)
		{
			if(languages.includes(languageList[i]))
			{
				str += `\n` +languageList[i].language;
				str3 +=`<option value="`+languageList[i].languageid+`">`+languageList[i].language+`</option>`;
			}
			else
			{
				str2 +=`<option value="`+languageList[i].languageid+`">`+languageList[i].language+`</option>`;
			}
		}
		str += `</p>`;
		str2 += `</select>
				<button onClick={()=>newLanguage()}>Save new language</button>`;
		str3 += `</select>
				<button onClick={()=>deleteLanguage()}>Remove language</button>`;
		if(game.gameMasterID==localStorage.getItem('userID'))
		{
			document.getElementById('languageDataDisplay').innerHTML = str+str2+str3;
		}
		else
		{
			document.getElementById('languageDataDisplay').innerHTML = str;
		}
	}
	function refreshThis()
	{
		printGameData();
		printBehaviorData();
		printLanguageData();
		printAddressData();
		printScheduleData();
		printUserData();
		printLinkData();
	}
	useEffect(() =>
	{
		getGameDataByID();
		console.log(game);
		//verify();
		console.log(addresses);
		console.log(schedules);
		console.log(users);
		printGameData();
		printBehaviorData();
		printLanguageData();
		printAddressData();
		printScheduleData();
		printUserData();
		printLinkData();
		//printUserData();
	});
    return ( 
		<div id = "editGameContainer" >
        	<NavBar />
			<div id = "gameDataDisplay">
			</div>
			<div id = "behaviorDataDisplay">
			</div>
			<div id = "languageDataDisplay">
			</div>
			<div id = "userDataDisplay">
			</div>
			<div id = "addressDataDisplay">
			</div>
			<div id = "addNewAddressButton">
			</div>
			<div id = "scheduleDataDisplay">
			</div>
			<div id = "addNewScheduleButton">
			</div>
			<div id = "linkDataDisplay">
			</div>
			<div id = "addNewLinkButton">
			</div>
			<div id = "joinOrLeaveButton">
			</div>
        </div>
    )
}
export default EditGames;