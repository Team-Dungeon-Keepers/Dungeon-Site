import '../styles/login.css'
import React from 'react'
import { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from "react-router-dom";
import { loginAsManager } from '../utils/authUtils';
import { NavBar } from './NavBar';
import { Userline} from './Userline';

function ViewAllUsers(props) { 
    const [users, setUsers] = useState(null)
    const {trigger,setTrigger} = props
    const history = useHistory()

    useEffect(()=> {
        if (loginAsManager()) {
            axiosWithAuth()
            .get('https://revature-ers-api-2021.herokuapp.com/api/users')
                .then(res => 
                    setUsers(res.data)
                )
        } else {
            history.push('/dashboard');
        }
    },[trigger])

    return(
    <div>   
        <NavBar />
        <h2 className="h-42" >All Users</h2> 
        
        <div className="tablecontainer">
        <table>
            <tr>
                <th class="th-long">User ID</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            {users && users.map(el => {
                return  <Userline key={el.ERS_USER_ID} el={el} 
                    trigger={trigger} setTrigger={setTrigger} />
            })}
            

        </table> 
        </div>
    </div>
    )
}

export default ViewAllUsers;
