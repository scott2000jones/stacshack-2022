import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {login as apiLogin} from "../lib/api";
import {Button, Card, FormControl, FormGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom"
import API from '../API';

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

    componentDidMount() {
        console.log("mount")
        
    }


    async login(e) {
        e.preventDefault()
        console.log("submit login")
        await API.get('/login/' + this.state.name + "." + this.state.password)
            .then(response => {
                console.log(response)
                localStorage.setItem("auth", this.state.name)
            },
                err => {
                    console.log(err)
                    this.setState({ error: err.response })
                })
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Sign In</Card.Title>
                    <Form className='mt-5 border-secondary' onSubmit={(e) => this.login(e)}>
                        <FormGroup className="mt-2">
                            <Form.Label>Username</Form.Label>
                            <FormControl type="text" placeholder="Enter username" value={this.state.name} onChange={this.handleChange("name")} />
                        </FormGroup>
                        <FormGroup className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <FormControl type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange("password")} />
                        </FormGroup>
                        <Button className= "mt-2" type="submit" variant="primary">Sign In</Button>
                        <Link to={"/register"}>
                            <span>Not registered? Sign Up!</span>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        );
        // return (
        //     <form className='mt-5 border-secondary'>
        //         Logged In?: {this.props.auth.loggedIn ? "Yes" : "No"}
        //         <h3>Sign In</h3>
        //         <div className="form-group">
        //             <label>Username</label>
        //             <input type="text" className="form-control" placeholder="Enter username" value={this.state.name} onChange={this.handleChange("name")} />
        //         </div>
        //         <div className="form-group">
        //             <label>Password</label>
        //             <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange("password")} />
        //         </div>
        //         <div className="form-group">
        //             <div className="custom-control custom-checkbox">
        //                 <input type="checkbox" className="custom-control-input" id="customCheck1" />
        //                 <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        //             </div>
        //         </div>
        //         <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Submit</button>
        //         <p className="forgot-password text-right">
        //             Forgot <a href="#">password?</a>
        //         </p>
        //     </form>
        // );
    }
}
 
export default Login;