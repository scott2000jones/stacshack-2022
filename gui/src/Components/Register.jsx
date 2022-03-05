import React, { Component } from 'react';
import {register as apiRegister} from "../lib/api";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange = key => event => {
        this.setState({
            [key]: event.target.value
        })
    }

    async register(e) {
        e.preventDefault()
        const res = await apiRegister(this.state.username, this.state.password)
        if (res === "TRUE") {
            this.props.updateAuth(this.state.name)
        } else {
            this.props.updateAuth();
        }
    }

    state = {  }
    render() {
        return (
            <form className='mt-5 border-secondary'>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" value={this.state.name} onChange={this.handleChange("name")} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange("password")} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}

export default Register;