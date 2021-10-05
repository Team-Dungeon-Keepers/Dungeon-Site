import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/login.css'

const NavBar = function ()  {
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('userRole');
      };
    
        return (
        <div id="nav-bar">
            <Link to="/">
                <button type="Button" onClick={logout} >
                    Logout
                </button>
            </Link>
            <Link to="/profile">
                <button type="Button" >
                    Profile
                </button>
            </Link>
            <Link to="/dashboard">
                <button type="button">
                    Dashboard
                </button>
            </Link>
            <Link to="/addreimb">
                <button type="button">
                    New Reimbursement
                </button>
            </Link>
            <Link to="/pendingreimb">
                <button type="button">
                    Approve/Deny
                </button>
            </Link>
            <Link to="/userview">
                <button type="button">
                    View Users
                </button>
            </Link>
        </div>
    )
}

export {
    NavBar
}