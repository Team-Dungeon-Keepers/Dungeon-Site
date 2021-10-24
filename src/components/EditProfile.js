import React, { useEffect, useState } from 'react'
import '../styles/editProfile.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { NavBar } from './NavBar'

function ProfileEdit(props) {
    useEffect(() => {
        let userName = localStorage.getItem('userID');
        getUserInfo(userName);
    });
    function getUserInfo(userID) {
        axios
            .get(`https://dungeon-site-api.herokuapp.com/api/users/${userID}`)
            .then((res) => {
                renderUserInformation(res.data);
            })
            .catch((err) => {
                console.log({err});
                alert(err.response.data.message);
            });
    }
    function renderUserInformation(userInformation) {
        let welcomeUser = document.getElementById("profileBodyContainerRightWelcome");
        let welcomeUserData = welcomeUser.innerHTML;
        let firstUser = document.getElementById("profileBodyContainerRightFirst");
        let firstUserData = firstUser.innerHTML;
        let lastUser = document.getElementById("profileBodyContainerRightLast");
        let lastUserData = lastUser.innerHTML;
        console.log(welcomeUser);
        console.log(userInformation.username);
        welcomeUser.innerHTML = welcomeUserData.concat(` ${userInformation.username}`);
        firstUser.innerHTML = firstUserData.concat(` ${userInformation.firstName}`);
        lastUser.innerHTML = lastUserData.concat(` ${userInformation.lastName}`);
    }
    return (
        <div id="profileContainer">
            <NavBar />
            <div id="profileBody">
                <div id="profileBodyContainer">
                    <div id="profileBodyContainerRightWelcomeContainer">
                        <span id="profileBodyContainerRightWelcome">Welcome</span>
                        <div id="editProfilePersonal">
                            <span id="profileBodyContainerRightFirst">First Name:</span>
                            <span id="profileBodyContainerRightLast">Last Name:</span>
                            <span id="profileBodyContainerRightEmail">Email:</span>
                            <span id="profileBodyContainerRightPassword">Password:</span>
                        </div>
                        <div id="editProfileAddress">
                            <span id="editProfileAddressStreet">Street: 
                                <input id="editProfileAddressStreetValue"></input>
                            </span>
                            <span id="editProfileAddressApt">
                                <input id="editProfileAddressAptValue"></input>
                            </span>
                            <span id="editProfileAddressCity">
                                <input id="editProfileAddressCityValue"></input>
                            </span>
                            <span id="editProfileAddressState">
                                <input id="editProfileAddressStateValue"></input>
                            </span>
                            <span id="editProfileAddressZip">
                                <input id="editProfileAddressZip"></input>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
