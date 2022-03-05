import React, { Component } from 'react';
import {register as apiRegister} from "../lib/api";
import Form from 'react-bootstrap/Form'
import {FormControl, FormGroup, Button, Card} from "react-bootstrap";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
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
        const res = await apiRegister(this.state.name, this.state.password)
    }

    state = {  }

    render() {
        return (
            <Card>
                <Card.Body style={{background: "#F6CFB2"}}>
                    <Card.Title>Sign Up</Card.Title>
                    <Form className='mt-5 border-secondary' onSubmit={this.register}>
                        <FormGroup className="mt-2">
                            <Form.Label>Username</Form.Label>
                            <FormControl type="text" placeholder="Enter username" value={this.state.name} onChange={this.handleChange("name")} />
                        </FormGroup>
                        <FormGroup className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <FormControl type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange("password")} />
                        </FormGroup>
                        <Button className= "mt-2" type="submit" variant="primary">Sign Up</Button>
                        <p className="forgot-password text-right">
                            Already registered <a href="#">sign in?</a>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default Register;