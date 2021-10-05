import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/register';
import PrivateRoute from './components/PrivateRoute';
import ProfileEdit from './components/ProfileEdit';
import ViewAllUsers from './components/ViewAllUsers';

function App() {
  let [trigger, setTrigger] = useState(false);

  return (
    <>
      <Router>
        <div className="logoAndHeading"></div>
          <Switch>
          <PrivateRoute path='/dashboard/:userID'>
             <Dashboard trigger={trigger} setTrigger={setTrigger} /> 
          </PrivateRoute>
          <PrivateRoute path='/dashboard'>
             <Dashboard trigger={trigger} setTrigger={setTrigger} /> 
          </PrivateRoute>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register" component={RegisterForm}/>
            <PrivateRoute path="/userview/:userID" >
              <ProfileEdit trigger={trigger} setTrigger={setTrigger} />
            </PrivateRoute>
            <PrivateRoute path="/profile/:userID">
              <ProfileEdit trigger={trigger} setTrigger={setTrigger} />
            </PrivateRoute>
            <PrivateRoute path="/profile">
            <ProfileEdit trigger={trigger} setTrigger={setTrigger} />
            </PrivateRoute>
            <PrivateRoute path="/userview" >
              <ViewAllUsers trigger={trigger} setTrigger={setTrigger} />
            </PrivateRoute>
            <Route exact path="/" component={LoginForm} />
          </Switch>
      </Router>
    </>
  );
}

export default App;
