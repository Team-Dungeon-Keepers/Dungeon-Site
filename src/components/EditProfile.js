import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import '../styles/editProfile.css'
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
            url: `https://dungeon-site-api.herokuapp.com//api/users/${neoUser.ERS_USER_ID}`,
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
                <div id="editProfileColumn1">
                    <div id="editProfileCurrentUserName">CurrentUserName</div>
                    <div id="editProfileCurrentEmail">CurrentEmail</div>
                </div>
                    <div id="editProfileColumn2">
                        <div id="editProfileCol2Row1">
                            <label id="label-username" htmlFor="username">Username
                                <input id="username" name="username" type="text" 
                                    onChange={handleChange} value={form.ERS_USERNAME}/>
                            </label>
                            <button id="button-register" className="btn btn-register"
                                onClick={handleSubmit}>Update</button>
                                {props.children}
                        </div>
                        <div id="editProfileCol2Row2">
                            <label id="label-email" htmlFor="email">Email
                                <input id="confirmPassword" name="USER_EMAIL" type="text" onChange={handleChange} 
                                    value={form.USER_EMAIL} />
                            </label>
                            <button id="button-register" className="btn btn-register"
                                onClick={handleSubmit}>Update</button>
                                {props.children}
                        </div>
                        <div id="editProfileCol2Row3">
                            <label id="label-password" htmlFor="password">Password
                                <input id="password" name="password" type="password"
                                onChange={handleChange} />
                            </label><br/>
                            <label id="label-confirm-password" htmlFor="confirmPassword">Confirm Password
                                <input id="confirmPassword" name="confirmPassword" type="password" onChange={handleChange} 
                                    value={form.confirmPassword} />
                            </label>
                            <button id="button-register" className="btn btn-register"
                                onClick={handleSubmit}>Update</button>
                            {props.children}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ProfileEdit);
