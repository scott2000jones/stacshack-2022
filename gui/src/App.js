import './App.css';
import Login from "./Components/Login";
import Gangs from "./Components/Gangs";
import Call from "./Components/Call";
import Navigation from './Components/Navigation';
import Register from "./Components/Register";
import Gang from "./Components/Gang";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {Component} from "react";
// import Webrtc_test_page from "./Components/webrtc_test_page"
 
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

render() {

  return (
    <Router>
      <Route component={Navigation}/>
      <div className="App m-4">
        {/* <Route component={HeaderBar}/> */}
          <Switch>
            <Route exact path="/">
              {(localStorage.getItem("auth") == null || localStorage.getItem("auth") == "null") ? <Login/> : <Gangs />}
            </Route>
            <Route path="/login">
              <Login auth={this.state.auth} updateAuth={this.updateAuth} />
            </Route>
            <Route path="/gangs" component={Gangs}/>
            <Route path="/call" component={Call}/>
            <Route path = "/register" component={Register}/>
            <Route path="/gang/:id" component={Gang}/>
            <Route exact path="/profile" >
              <Profile auth={this.state.auth} />
            </Route>
            {/*<Route path="/webrtc_test_page" component={Webrtc_test_page}/>*/}
          </Switch>
        </div>
    </Router>
  );
  }
}

export default App;
