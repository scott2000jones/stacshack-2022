import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {login as apiLogin} from "../lib/api";
import {Button, Card, FormControl, FormGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
                    <Card.Title><h1>Sign In</h1></Card.Title>
                    <Form className='mt-5 border-secondary' onClick={this.login}>
                        <FormGroup className="mt-2">
                            <Row className= "justify-content-center">
                                <Col xs={7}>
                                    <FormControl type="text" placeholder="Enter username" value={this.state.name} onChange={this.handleChange("name")} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className="mt-2">
                            <Row className= "justify-content-center">
                                <Col xs={7}>

                                    <FormControl type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange("password")} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button className= "mt-3" type="submit" variant="primary">Sign In</Button>
                        <div className="mt-2">
                            <Link to={"/register"} className="mt-2">
                                <span>Not registered? Sign Up!</span>
                            </Link>
                        </div>

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