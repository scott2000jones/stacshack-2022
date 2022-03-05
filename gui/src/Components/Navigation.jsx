import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";


class Navigation extends Component {


    logoutButton() {
        if (localStorage.getItem("auth") == null || localStorage.getItem("auth") == "null") {
            return (
                <Nav.Link as={Link} to="/login">
                    Log In
                </Nav.Link>
            )
        }
        return (
            <Nav.Link as={Link} to="/login" onClick={() => localStorage.setItem("auth", null)}>
                Logout as {localStorage.getItem("auth")}
            </Nav.Link>
        )
    }

    render() { 
        return (
            <Navbar variant="dark" bg="secondary">
                <Navbar.Brand  as={Link} to="/">
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
                Gangs
              </Nav.Link>
                {this.logoutButton()}

            </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
 
export default Navigation;