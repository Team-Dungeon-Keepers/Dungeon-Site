import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css'

const NavBar = function ()  {
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('userRole');
		document.body.style.background = "linear-gradient(to bottom, #5db5fd, #2176ff)";
    };
    const showHomeDropDown = () => {
        document.getElementById("navBarHomeIconDropDown").style.display = "block";
    };
    const showUserDropDown = () => {
        document.getElementById("navBarUserIconDropDown").style.display = "block";
    };
    window.onclick = function(event) {
        let homeIcon = document.getElementById("navBarHomeIcon");
        let homeList = document.getElementById("navBarHomeIconDropDown");
        let userIcon = document.getElementById("navBarUserIcon");
        let userList = document.getElementById("navBarUserIconDropDown");
        if (event.target !== homeIcon) {
            if(homeList!=null){
                if (homeList.style.display === 'block') {
                    homeList.style.display = 'none';
                }
            }
        } 
        if (event.target !== userIcon) {
            if(userList!=null){
                if (userList.style.display === 'block') {
                    userList.style.display = 'none';
                }
            }
        }
    }
    
        return (
        <div id="nav-bar">
            <div id="navBarHomeIcon" onClick={showHomeDropDown}>
                <div id="navBarHomeIconDropDown">
                    <Link to="/dashboard">
                        <button type="button">
                            Dashboard
                        </button>
                    </Link>
                </div>
            </div>
            <div id="navBarUserIcon" onClick={showUserDropDown}>
                <div id="navBarUserIconDropDown">
                    <Link to="/">
                        <button type="Button" onClick={logout} >
                            Logout
                        </button>
                    </Link><br/>
                    <Link to="/editprofile">
                        <button type="Button" >
                            Edit User
                        </button>
                    </Link>
                    <Link to="/profile">
                        <button type="Button" >
                            Profile
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {
    NavBar
}