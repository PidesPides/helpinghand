import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { PathsLabel } from './Components/Common/Utils/Paths';



//Logo
//import logo from './logo.svg';

//Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import "react-datetime/css/react-datetime.css";
//import "./Components/Common/Utils/Popups/CreateEvent.css";


//imports
import Menu from './Components/Common/Menu/Menu.js';
import Footer from './Components/Common/Footer/Footer.js';
import Home from './Components/Home/Home.js';
import Login from './Components/User/Login.js';
import Register from './Components/User/Register.js';
import UpdateInfo from './Components/User/UpdateInfo.js';
import Profile from './Components/User/Profile.js';
import ProfileSettings from './Components/User/ProfileSettings.js';
import ChangePassword from './Components/User/ChangePassword.js';
import Maps from './Components/Common/Utils/Maps.js';
import BackOffice from './Components/Common/Backoffice/BoHome.js';
import AboutUs from './Components/Common/AboutUs/AboutUs.js';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Menu />
        <div className="div-body">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path={PathsLabel.Login} component={Login} />
            <Route exact path={PathsLabel.Register} component={Register} />
            <Route exact path={PathsLabel.Login} component={Login} />
            <Route exact path={PathsLabel.UpdateInfo} component={UpdateInfo} />
            <Route exact path={PathsLabel.Profile} component={Profile} />
            <Route exact path={PathsLabel.ProfileSettings} component={ProfileSettings} />
            <Route exact path={PathsLabel.ChangePassword} component={ChangePassword} />
            <Route exact path={PathsLabel.Maps} component={Maps} />
            <Route exact path={PathsLabel.BackOffice} component={BackOffice} />
            <Route exact path={PathsLabel.AboutUs} component={AboutUs} />
          </Switch>
        </div>

        <Footer />
      </HashRouter>
    );
  }
}

export default App;
