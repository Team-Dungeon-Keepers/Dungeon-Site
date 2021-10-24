import React, { useEffect } from 'react'
import '../styles/profile.css';
import { connect } from 'react-redux'
import { NavBar } from './NavBar'
import axios from 'axios';

function ProfileEdit() {

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
                    <div id="profileBodyContainerLeft">
                        <div id="profileBodyContainerLeftTop"></div>
                        <div id="profileBodyContainerLeftBottom"></div>
                    </div>
                    <div id="profileBodyContainerRight">
                        <div id="profileBodyContainerRight1">
                            <div id="profileBodyContainerRightWelcomeContainer">
                                <span id="profileBodyContainerRightWelcome">Welcome</span>
                                <span id="profileBodyContainerRightFirst">First Name:</span>
                                <span id="profileBodyContainerRightLast">Last Name:</span>
                                <span id="profileBodyContainerRightEmail">Email:</span>
                                <span id="profileBodyContainerRightPassword">Password:</span>
                            </div>
                        </div>
                        <div id="profileBodyContainerRight2">
                            <span>Games Joined</span>
                        </div>
                        <div id="profileBodyContainerRight3">
                            <span>Game Master Games</span>
                        </div>
                        <div id="profileBodyContainerRight4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
