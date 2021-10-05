import React from 'react';
import { useHistory } from 'react-router';
import { loginAsManager } from '../utils/authUtils';

import { RoleToString } from '../utils/enumToString';

function Userline(props) {
    let {el} = props;
    const {trigger, setTrigger} = props; 
    let history = useHistory();

    const editUser = function () {
        history.push(`/userview/${el.ERS_USER_ID}`);
    }

    const viewTickets = function() {
        history.push(`/dashboard/${el.ERS_USER_ID}`);
    }
    
    return (<tr>
        <td>{el.ERS_USER_ID}</td>
        <td>{el.ERS_USERNAME}</td>
        <td>{el.USER_FIRST_NAME}</td>
        <td>{el.USER_LAST_NAME}</td>
        <td>{el.USER_EMAIL}</td>
        <td>{RoleToString(el.USER_ROLE_ID)}</td>
                
         {( loginAsManager() && 
            <>
                <button onClick={editUser}>Edit</button>
                <button onClick={viewTickets}>View Tickets</button>
            </>
         )}
    </tr>)
}

export {
    Userline
}
