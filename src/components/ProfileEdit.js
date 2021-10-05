import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import '../styles/login.css'
import * as yup from 'yup'
import axios from 'axios';
import { updateSchema } from '../schema/loginSchema'
import { connect } from 'react-redux'

import axiosWithAuth from '../utils/axiosWithAuth';
import { loginAsManager } from '../utils/authUtils'
import { NavBar } from './NavBar'

function ProfileEdit(props) {
    const initialValues = {
        username: "",
        password: "",
        confirmPassword: ""
    }
    const [disabled, setDisabled] = useState(true);
    const [form, setForm] = useState(initialValues);
    const [shaped, setShaped] = useState({});
    let history = useHistory();
    const { trigger, setTrigger } = props;
    let { userID } = useParams();

    const updateUser = async (user) => {
        const token = localStorage.getItem('token');

        if (userID == null)
            userID = localStorage.getItem('userID');

        var neoUser = {
            ERS_USER_ID: userID,
            ERS_USERNAME: user.username,
            ERS_PASSWORD: user.password,
            USER_FIRST_NAME: user.USER_FIRST_NAME,
            USER_LAST_NAME: user.USER_LAST_NAME,
            USER_EMAIL: user.USER_EMAIL
        }
        await axios({
            method: 'PUT',
            url: `https://revature-ers-api-2021.herokuapp.com/api/users/${neoUser.ERS_USER_ID}`,
            data: neoUser,
            headers: {
                'authorization': JSON.parse(token)
            }
        }).then((res) => {
            history.push('/dashboard');
          })
          .catch((err) => {
            console.log({err});
          });
    };

    const checkSchema = (name, value) => {
        yup.reach(updateSchema, name).validate(value)
            .then(() => {
                setShaped({...shaped, [name]: ''});
            }).catch((err) => {
                if (err.errors) { 
                    setShaped({...shaped, [name]: err.errors[0]});
                }
        });

        updateSchema.isValid(form)
            .then((valid) => setDisabled(!valid));
    }

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        const updateData = (type === 'checkbox')?checked:value;
        setForm({...form, [name]: updateData});
        checkSchema(name, updateData);
    }

    const handleSubmit = () => {
        updateUser(form)
    }

    useEffect(()=> {
        if ((userID == null) || (!loginAsManager())) 
            userID = localStorage.getItem('userID');
       
        axiosWithAuth().get(`/users/${userID}`)
        .then(res => {
            res.ERS_PASSWORD = "";
            setForm(res.data)
        })
        
    }, [trigger])


    return (
        <div>
            <NavBar />
            <div id="form-profile" className="form form-profile">
                <h1>Edit Profile</h1>
                <div id="error-register" className="error error-register" ></div>
                <div id="error-username" className="error error-username" >{shaped.username}</div>
                <label id="label-username" htmlFor="username">Username
                    <input id="username" name="username" type="text" 
                        onChange={handleChange} value={form.ERS_USERNAME}/>
                </label>
                <div id="error-password" className="error error-password" >
                    {shaped.password}</div>
                <label id="label-password" htmlFor="password">Password
                    <input id="password" name="password" type="password"
                        onChange={handleChange} />
                </label>
                <div id="error-confirm-password" className="error error-confirm-password" >{shaped.confirmPassword}</div>
                <label id="label-confirm-password" htmlFor="confirmPassword">Confirm Password
                    <input id="confirmPassword" name="confirmPassword" type="password" onChange={handleChange} 
                    value={form.confirmPassword} />
                </label>
                <label id="label-first-name" htmlFor="firstName">First Name
                    <input id="confirmPassword" name="USER_FIRST_NAME" type="text" onChange={handleChange} 
                    value={form.USER_FIRST_NAME} />
                </label>
                <label id="label-last-name" htmlFor="lastName">Last Name
                    <input id="confirmPassword" name="USER_LAST_NAME" type="text" onChange={handleChange} 
                    value={form.USER_LAST_NAME} />
                </label>
                <label id="label-email" htmlFor="email">Email
                    <input id="confirmPassword" name="USER_EMAIL" type="text" onChange={handleChange} 
                    value={form.USER_EMAIL} />
                </label>
                <button id="button-register" className="btn btn-register"
                    onClick={handleSubmit}>Update</button>
                {props.children}
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
