import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/register.css';
import * as yup from 'yup';
import { schema } from '../schema/loginSchema';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavBar } from './NavBar';
import { createUser } from '../actions/userActions';

function RegisterForm(props) {
    const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
        username: "",
        password: "",
        confirmPassword: "",
        street: "",
        apartment: "",
        city: "",
        state: "",
        zip: ""
    }
    const [disabled, setDisabled] = useState(true);
    const [form, setForm] = useState(initialValues);
    const [shaped, setShaped] = useState({});
    let history = useHistory();

    const postNewUser = (user) => {
        var neoUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        var neoAddress = {
            street: user.street,
            apartment: user.apartment,
            city: user.city,
            state: user.state,
            zip: user.zip
        }
        var userAddress = {
            user: neoUser,
            address: neoAddress
        }
        registerUserAddressAxiosCall(userAddress);

        /*userAxiosCall(neoUser);
        addressAxiosCall(neoAddress);*/
    };

    const registerUserAddressAxiosCall = (userAddress) => {
        axios
        .post('https://dungeon-site-api.herokuapp.com/api/auth/registeruseraddress', userAddress)
        .then(console.log("completed user DB call"))
        .catch((err) => {
          console.log({err});
        });
    }
/*
    const userAxiosCall = (neoUser) => {
        axios
        .post('https://dungeon-site-api.herokuapp.com/api/address', neoUser)
        .catch((err) => {
          console.log({err});
        });
    }

    const addressAxiosCall = (neoAddress) => {
        axios
        .post('https://dungeon-site-api.herokuapp.com/api/address', neoAddress)
        .then((res) => {
            history.push('/login');
          })
        .catch((err) => {
          console.log({err});
        });
    }
*/
    const checkSchema = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => {
                setShaped({...shaped, [name]: ''});
            }).catch((err) => {
                if (err.errors) { 
                    setShaped({...shaped, [name]: err.errors[0]});
                }
        });

        schema.isValid(form)
            .then((valid) => setDisabled(!valid));
    }

    const gotoLogin = () => {
        history.push("/login");
    }

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        const updateData = (type === 'checkbox')?checked:value;
        setForm({...form, [name]: updateData});
        checkSchema(name, updateData);
    }

    const handleSubmit = () => {
        postNewUser(form)
    }

    const createUser = () => {

    }

    return (
        <div id="registerContainer">
            <div id="form-register" className="form form-register">
                <h1>Register Form</h1>
				<div id="registerSecondRow">
                    <h2>User Info:</h2>
                    <h2><span>optional</span> Address:</h2>
                    <div id="registerFirstLeft">
                        <div id="error-firstName" className="error error-firstName" >{shaped.firstName}</div>
                        <label id="label-firstName" htmlFor="firstName">First Name
                            <input id="firstName" name="firstName" type="text" 
                                onChange={handleChange} value={form.firstName}/>
                        </label>
                    </div>
                    <div id="registerSecondLeft">
                        <div id="error-lastName" className="error error-lastName" >{shaped.lastName}</div>
                        <label id="label-lastName" htmlFor="lastName">Last Name
                            <input id="lastName" name="lastName" type="text" 
                                onChange={handleChange} value={form.lastName}/>
                        </label>
                    </div>
                    <div id="registerThirdLeft">
                        <div id="error-email" className="error error-email" >{shaped.email}</div>
                        <label id="label-email" htmlFor="email">Email
                            <input id="email" name="email" type="text" 
                                onChange={handleChange} value={form.email}/>
                        </label>
                    </div>
                    <div id="registerFourthLeft">
                        <div id="error-register" className="error error-register" ></div>
                        <div id="error-username" className="error error-username" >{shaped.username}</div>
                        <label id="label-username" htmlFor="username">Username
                            <input id="username" name="username" type="text" 
                                onChange={handleChange} value={form.username}/>
                        </label>
                    </div>
                    <div id="registerFifthLeft">
                        <div id="error-password" className="error error-password" >
                            {shaped.password}</div>
                        <label id="label-password" htmlFor="password">Password
                            <input id="password" name="password" type="password"
                                onChange={handleChange} value={form.password} />
                        </label>
                        </div>
                        <div id="registerSixthLeft">
                        <div id="error-confirm-password" className="error error-confirm-password" >{shaped.confirmPassword}</div>
                        <label id="label-confirm-password" htmlFor="confirmPassword">Confirm Password
                            <input id="confirmPassword" name="confirmPassword" type="password" onChange={handleChange} 
                            value={form.confirmPassword} />
                        </label>
                    </div>
                    <div id="registerFirstRight">
                        <div id="error-register" className="error error-register" ></div>
                        <div id="error-street" className="error error-street" >{shaped.username}</div>
                        <label id="label-street" htmlFor="street">Street
                            <input id="street" name="street" type="text" 
                                onChange={handleChange} value={form.street}/>
                        </label>
                    </div>
                    <div id="registerSecondRight">
                        <div id="error-register" className="error error-register" ></div>
                        <div id="error-apartment" className="error error-apartment" >{shaped.apartment}</div>
                        <label id="label-apartment" htmlFor="apartment">Apartment/Unit #
                            <input id="apartment" name="apartment" type="number" 
                                onChange={handleChange} value={form.apartment}/>
                        </label>
                    </div>
                    <div id="registerThirdRight">
                        <div id="error-register" className="error error-register" ></div>
                        <div id="error-city" className="error error-city" >{shaped.city}</div>
                        <label id="label-city" htmlFor="city">City
                            <input id="city" name="city" type="text" 
                                onChange={handleChange} value={form.city}/>
                        </label>
                    </div>
                    <div id="registerFourthRight">
                        <div id="error-register" className="error error-register" ></div>
                        <div id="error-state" className="error error-state" >{shaped.state}</div>
                        <label id="label-state" htmlFor="sate">State
                            <select id="state" name="state" type="text" 
                                onChange={handleChange} value={form.state}>
                                    <option selected>{form.state}</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                            </select>
                        </label>
                    </div>
                    <div id="registerFifthRight">
                        <div id="error-register" className="error error-register" ></div>
                        <div id="error-zip" className="error error-zip" >{shaped.zip}</div>
                        <label id="label-zip" htmlFor="zip">Zipcode
                            <input id="zip" name="zip" type="number" 
                                onChange={handleChange} value={form.zip}/>
                        </label>
                    </div>
				</div>
				
				<div id="registerThirdRow">
                    <button id="button-nav-register" className=""
                        onClick={handleSubmit} >Submit</button>
                    {props.children}
				</div>
            </div>
        </div>
    )
}
export default RegisterForm;
//export default connect(null, { createUser })(RegisterForm);
