import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'; 
import LandingPage from './components/Landing/landing';
import AboutUs from './components/AboutUs/aboutus';
import Login from './components/Login/login';
import Register from './components/Register/register';
import LeaderBoard from './containers/LeaderBoard/leaderboard';
import TermsOfService from './components/TermsofService/termsofservice'
import Feedback from './components/Feedback/feedback';
import Profile from './containers/Profile/profile';
import Navbar from './containers/NavBar/NavBar';
import Coding from './containers/Coding/coding'
import Dashboard from './containers/Dashboard/dashboard'


class App extends Component {
  render() {
    return (
      //adding all the routes to the router
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={LandingPage} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/profile" component={Profile} />
          <Route path="/termsofservice" component={TermsOfService} />
          <Route path="/coding/:id" component={Coding} />
          <Route path="/challenge" component={Dashboard} />
        </div>
      </Router>
    );
  }
}
export default App;
