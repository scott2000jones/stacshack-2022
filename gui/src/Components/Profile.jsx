import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from "react-bootstrap/Nav";
import {Link, Route} from "react-router-dom";



class Profile extends Component {
    state = {  }

    logoutButton() {
        if (localStorage.getItem("auth") == null || localStorage.getItem("auth") == "null") {
            return (
                <Link as={Link} to="/login">
                    <Button className="m-2" variant="primary">
                        Log In
                    </Button>
                </Link>
            )
        }
        return (
            <Link as={Link} to="/login" onClick={() => localStorage.setItem("auth", null)}>
                <Button className="m-2" variant="primary">
                    Logout ({localStorage.getItem("auth")})
                </Button>
            </Link>
        )
    }

    render() {
        return (
            <Card className='mt-4 border-secondary'>
                <Card.Body>
                    <Card.Title>Username: {this.props.auth?.name} </Card.Title>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li">
                            General
                        </ListGroup.Item>
                        <ListGroup.Item as="li">Privacy</ListGroup.Item>
                        <ListGroup.Item as="li" disabled>
                            Security
                        </ListGroup.Item>
                        <ListGroup.Item as="li">Information</ListGroup.Item>
                    </ListGroup>
                    
                    {this.logoutButton()}
                    <Card>
                    </Card>
                </Card.Body>
            </Card>

        );
    }
}

export default Profile;