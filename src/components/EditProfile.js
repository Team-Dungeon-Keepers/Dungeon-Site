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
        console.log(userInformation);
        console.log(localStorage.getItem("userID"));
        let welcomeUser = document.getElementById("profileBodyContainerRightWelcome");
        let welcomeUserData = welcomeUser.innerHTML;
        let firstUser = document.getElementById("profileBodyContainerRightFirstValue");
        let lastUser = document.getElementById("profileBodyContainerRightLastValue");
        let emailUser = document.getElementById("profileBodyContainerRightEmailValue");
        let passwordUser = document.getElementById("profileBodyContainerRightPasswordValue");
        welcomeUser.innerHTML = welcomeUserData.concat(` ${userInformation.username}`);
        firstUser.setAttribute("placeholder", `${userInformation.firstName}`);
        lastUser.setAttribute("placeholder", `${userInformation.lastName}`);
        emailUser.setAttribute("placeholder", `${userInformation.email}`);
        passwordUser.setAttribute("placeholder", `${userInformation.password}`);
        firstUser.setAttribute("value", `${userInformation.firstName}`);
        lastUser.setAttribute("value", `${userInformation.lastName}`);
        emailUser.setAttribute("value", `${userInformation.email}`);
    }
    function submitEditChange() {
        var userID = localStorage.getItem("userID")
        var firstUser = document.getElementById("profileBodyContainerRightFirstValue");
        var lastUser = document.getElementById("profileBodyContainerRightLastValue");
        var emailUser = document.getElementById("profileBodyContainerRightEmailValue");
        var passwordUser = document.getElementById("profileBodyContainerRightPasswordValue");
        var newUserInfo = {
            username: userID,
            firstName: firstUser,
            lastName: lastUser,
            email: emailUser,
            password: passwordUser
        }
        updateUser(userID, newUserInfo);
    }
    const updateUser = (userID, newUserInfo) => {
        console.log(userID+"axios");
        console.log(newUserInfo+"axios");
        axios
          .put(`https://dungeon-site-api.herokuapp.com/api/users/${userID}`, newUserInfo)
          .then((res) => {
              console.log(res);
          })
          .catch((err) => {
            console.log({err});
            alert("Line3: " + err.response);
          });
    };
    return (
        <div id="profileContainer">
            <NavBar />
            <div id="profileBody">
                <div id="profileBodyContainer">
                    <div id="profileBodyContainerRightWelcomeContainer">
                        <span id="profileBodyContainerRightWelcome">Welcome</span>
                        <div id="editProfilePersonal">
                            <span id="profileBodyContainerRightFirst">First Name: 
                                <input id="profileBodyContainerRightFirstValue"></input>
                            </span>
                            <span id="profileBodyContainerRightLast">Last Name: 
                                <input id="profileBodyContainerRightLastValue"></input>
                            </span>
                            <span id="profileBodyContainerRightEmail">Email: 
                                <input id="profileBodyContainerRightEmailValue"></input>
                            </span>
                            <span id="profileBodyContainerRightPassword">Password: 
                                <input id="profileBodyContainerRightPasswordValue"></input>
                            </span>
                        </div>
                        <div id="editProfileSubmit">
                            <button id="editProfileSubmitButton" onClick={submitEditChange}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
