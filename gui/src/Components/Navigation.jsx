import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link, Route} from "react-router-dom";
import logo from "../images/logo.png";
import Profile from "./Profile";
import DropdownButton from "react-bootstrap/DropdownButton"


class Navigation extends Component {


    render() {
        let profile = <></>
        if (localStorage.getItem("auth") != null && localStorage.getItem("auth") != "null") profile = (
            <Nav.Link as={Link} to="/profile">
                <h2>Profile: {localStorage.getItem("auth")} </h2>
            </Nav.Link>)
        return (
            <Navbar className="w-100 justify-content-center" variant="dark" bg="secondary">
                <Navbar.Brand as={Link} to="/">
                  <img
                    alt=""
                    src={logo}
                    width="70"
                    height="70"
                    className="d-inline-block align-center m-2 "
                  />{" "}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                 <Nav.Link as={Link} to="/gangs">
                    <h2>
                Gangs
                </h2>
              </Nav.Link>
              {profile}
               
            </Nav>
            
            </Navbar.Collapse>
            </Navbar>
        );
    }
}




 
export default Navigation;