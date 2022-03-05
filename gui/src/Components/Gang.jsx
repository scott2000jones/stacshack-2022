import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Container, Row, Col} from "react-bootstrap";
import {Telephone} from "react-bootstrap-icons";
import Chat from "./Chat";

class Gang extends Component {
    state = { 
        id:this.props.match.params.id, 
    } 

    render() { 
        return (
            <Card>
                <Card.Body>
                    <Container >
                        <Row className="d-flex xs=12">
                        <Col className="flex-left xs-6">
                             <Card.Title>Gang: {this.state.id}</Card.Title>                       
                        </Col>
                        <Col className="flex-right xs-6">
                            <Button variant="primary"><span><Telephone/> Call Gang</span></Button>
                        </Col>
                        </Row>
                       
                    </Container>
                   
                    
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Messages</Card.Title>
                            <Chat></Chat>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        );
    }
}
 
export default Gang;