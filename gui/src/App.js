import './App.css';
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Contacts from "./Components/Contacts";
import Call from "./Components/Call";
import Navigation from './Components/Navigation';
import Register from "./Components/Register";
import Gang from "./Components/Gang";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {Component} from "react";
 
import Webrtc_test_page from "./Components/webrtc_test_page"

function App() {
  return (
    <Router>
      <Route component={Navigation}/>
      <div className="App h-100" style={{ "background-color": "#66090D" }}>
        <div className="App h-100">
        {/* <Route component={HeaderBar}/> */}
        <div className="container-md">
          <Switch>
            <Route exact path="/">
              <Welcome auth={this.state.auth} />
            </Route>
            <Route exact path="/home">
              <Welcome auth={this.state.auth} />
            </Route>
            <Route path="/login">
              <Login auth={this.state.auth} updateAuth={this.updateAuth} />
            </Route>
            <Route path="/contacts" component={Contacts}/>
            <Route path="/call" component={Call}/>
            <Route path = "/register" component={Register}/>
            <Route path="/gang/:id" component={Gang}/>
            <Route path="/webrtc_test_page" component={Webrtc_test_page}/>
          </Switch>
        </div>
        </div>
        </div>
    </Router>
  );
  }
}

export default App;
