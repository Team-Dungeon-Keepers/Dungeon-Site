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
        let welcomeUserData = document.getElementById("profileBodyContainerRightWelcome").innerHTML;
        console.log(welcomeUser);
        console.log(userInformation.username);
        welcomeUser.innerHTML = welcomeUserData.concat(` ${userInformation.username}`);
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
                            <h1 id="profileBodyContainerRightWelcome">Welcome</h1>
                        </div>
                        <div id="profileBodyContainerRight2"></div>
                        <div id="profileBodyContainerRight3"></div>
                        <div id="profileBodyContainerRight4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
