import '../styles/login.css'
import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";

import axiosWithAuth from '../utils/axiosWithAuth';
import { loginAsManager } from '../utils/authUtils';
import { NavBar } from './NavBar';

function Dashboard(props) { 
    const [reimb, setReimb] = useState(null);
    const {trigger, setTrigger} = props;
    const history = useHistory();

    let { userID } = useParams();

    useEffect(()=> {
        if ((userID == null) || (!loginAsManager())) 
            userID = localStorage.getItem('userID');
       
        axiosWithAuth()
            .get(`https://dungeon-site-api.herokuapp.com/api/reimb/user/${userID}`)
            .then(res => 
                setReimb(res.data)
            )
        
    }, [trigger])

    return(
    <div>   
        <NavBar />
            <h2>My Reimbursements</h2> 
        <div className="tablecontainer">
        <table>
            <tr>
                <th>Reimb ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Author</th>
                <th>Resolved By</th>
                <th>Submitted</th>
                <th>Resolved</th>
            </tr>
            {/* {reimb && reimb.map(el => {
                return  <Reimbline key={el.REIMB_ID} el={el} 
                    trigger={trigger} setTrigger={setTrigger} />
            })} */}
            

        </table> 
        </div>
    </div>
    )
}

export default Dashboard;
