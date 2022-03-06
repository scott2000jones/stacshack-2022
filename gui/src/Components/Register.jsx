import React, { Component } from 'react';
import {register as apiRegister} from "../lib/api";
import Form from 'react-bootstrap/Form'
import {FormControl, FormGroup, Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    async register() {
        const res = await apiRegister(this.state.name, this.state.password)
    }

    state = {  }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title><h1>Sign Up</h1></Card.Title>
                    <Form className='mt-5 border-secondary' onSubmit={this.register}>
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
                        <Button className= "mt-3" type="submit" variant="primary">Sign Up</Button>
                        <div className="mt-2">
                            <Link to={"/login"} className="mt-2">
                                <span>Already registered? Sign In!</span>
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default Register;