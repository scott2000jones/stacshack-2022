import logo from './logo.svg';
import './App.css';
import Welcome from "./Components/Welcome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
 
function App() {
  return (
    <Router>
    <div className="App h-100">
  
        {/* <Route component={HeaderBar}/> */}
        <div className="container-md">
          <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Welcome}/>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
