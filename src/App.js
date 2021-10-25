import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/register';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import ViewAllUsers from './components/ViewAllUsers';
import CreateGame from './components/CreateGame';
import MyGames from './components/MyGames';
import FindGames from './components/FindGames';
import Compendium from './components/Compendium';
import GameView from './components/GameView';
import EditGames from './components/EditGames';
function App() {
  let [trigger, setTrigger] = useState(false);

  return (
    <>
      <Router>
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
                <EditProfile trigger={trigger} setTrigger={setTrigger} />
              </PrivateRoute>
              <PrivateRoute path="/editprofile/:userID">
                <EditProfile trigger={trigger} setTrigger={setTrigger} />
              </PrivateRoute>
              <PrivateRoute path="/editprofile">
              <EditProfile trigger={trigger} setTrigger={setTrigger} />
              </PrivateRoute>
              <PrivateRoute path="/userview" >
                <ViewAllUsers trigger={trigger} setTrigger={setTrigger} />
              </PrivateRoute>
              <Route exact path="/" component={LoginForm} />
              <PrivateRoute path="/creategame">
                <CreateGame/>
              </PrivateRoute>
              <PrivateRoute path="/mygames">
                <MyGames/>
              </PrivateRoute>
              <PrivateRoute path="/editgames">
                <EditGames/>
              </PrivateRoute>
              <PrivateRoute path="/findgames">
                <FindGames/>
              </PrivateRoute>
              <PrivateRoute path="/compendium">
                <Compendium/>
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile/>
              </PrivateRoute>
              <PrivateRoute path="/gameview">
				        <GameView/>
			        </PrivateRoute>
          </Switch>
      </Router>
    </>
  );
}

export default App;
