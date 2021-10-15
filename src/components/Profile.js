import React, { useEffect, useState } from 'react'
import '../styles/login.css'
import { connect } from 'react-redux'
import { NavBar } from './NavBar'

function ProfileEdit(props) {


    return (
        <div>
            <NavBar />
            <div id="profile">Profile
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
