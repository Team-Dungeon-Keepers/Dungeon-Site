import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/login.css'
import * as yup from 'yup'
import { loginSchema as schema } from '../schema/loginSchema'
import axios from 'axios';

function LoginForm(props) {

    const initialValues = {
        username: "",
        password: "",
    }

    const [disabled, setDisabled] = useState(true);
    const [form, setForm] = useState(initialValues);
    const [shaped, setShaped] = useState({});
    let history = useHistory();

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
            .then((valid) => {
                setDisabled(!valid);
            });
    }

    const postNewLogin = (newLogin) => {
        var neoUser = {
            username: newLogin.username,
            password: newLogin.password
        };
        axios
          .post('https://dungeon-site-api.herokuapp.com/api/auth/login', neoUser)
          .then((res) => {
            const token = res.data.token;
            const user = res.data.user;
            localStorage.setItem('token', `"${token}"`);
            localStorage.setItem('userID', `${user.userID}`);
            localStorage.setItem('user', `${user}`);
			document.body.style.background = "white";
            history.push("/dashboard");
          })
          .catch((err) => {
            console.log({err});
            alert("Login Failed: Please check your credentials");
          });
      };

    const goRegister = () => {
        history.push("/register");
    }

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        const updateData = (type === 'checkbox')?checked:value;
        setForm({...form, [name]: updateData});
        checkSchema(name, updateData);
    }
 
    const handleSubmit = () => {
        postNewLogin(form)
    }

    return (
            <div id="form-login" className="form form-login">
				<div id="loginRow1">
				<span id="dungeonSite">Dungeon Site</span><br/><br/>
				<span id="loginSpan">Login</span>
				</div>
				<div id="loginRow2">
                	<div id="error-login" className="error error-login" >
                    	{shaped.username}</div>
                	<div id="error-username" className="error error-username" ></div>
						<span>UserName</span><br/>
                    	<input id="username" name="username" type="text" 
                        	onChange={handleChange} value={form.username} />
                	<div id="error-password" className="error error-password" >
                    	{shaped.password}
                </div>
						<span>Password</span><br/>
                    	<input id="password" name="password" type="password"
                    	onChange={handleChange} value={form.password} />
				</div>
				<div id="loginRow3">
                	<button id="button-login" className="btn btn-login" 
                    	disabled={disabled} onClick={handleSubmit}>GO!</button><br/><br/>
					<span>New To Dungeon Site?</span><br/>
                	<span onClick={goRegister}>Register Here</span>
                	{props.children}
				</div>
            </div>
    )
}

export default LoginForm;
