import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";


class Navigation extends Component {
    state = {  } 

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
            </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
 
export default Navigation;