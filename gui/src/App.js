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
 
class App extends Component {

    constructor() {
      super();
      const persistedAuth = localStorage.getItem("auth");

      this.state = {
        auth: {
          loggedIn: !!persistedAuth,
          name: persistedAuth != 'null' ? persistedAuth:  undefined,
        }
      }
      this.updateAuth = this.updateAuth.bind(this);
  }

  updateAuth(name) {
    if (name) {
      this.setState({
        auth: {
          loggedIn: true,
          name,
        }
      });
      localStorage.setItem("auth", name);
    } else {
      this.setState({
        auth: {
          loggedIn: false,
          name: undefined,
        }
      })
      localStorage.setItem("auth", null);
    }
  }

  render(){
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
        </Switch>
        </div>
        </div>
        </div>
    </Router>
  );
  }
}

export default App;
