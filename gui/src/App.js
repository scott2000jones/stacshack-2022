import logo from './logo.svg';
import './App.css';
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Contacts from "./Components/Contacts";
import Call from "./Components/Call";
import Navigation from './Components/Navigation';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
 
function App() {
  return (
    <Router>
      <Route component={Navigation}/>
    <div className="App h-100">
  
        {/* <Route component={HeaderBar}/> */}
        <div className="container-md">
          <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Welcome}/>
            <Route path="/login" component={Login}/>
            <Route path="/contacts" component={Contacts}/>
            <Route path="/call" component={Call}/> 

          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
