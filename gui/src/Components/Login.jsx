import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {login as apiLogin} from "../lib/api"

class Login extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange = key => event => {
        this.setState({
            [key]: event.target.value
        })
    }

    login(e) {
        e.preventDefault()
        apiLogin(this.state.name, this.state.password)
    }

    render() { 
        return (
            <form className='mt-5 border-secondary'>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.name} onChange={this.handleChange("name")} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange("password")} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
 
export default Login;