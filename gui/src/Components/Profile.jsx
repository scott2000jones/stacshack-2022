import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function alertClicked() {
    alert('Settings Coming Soon');
}


//
// render(
//     <ListGroup defaultActiveKey="#link1">
//         <ListGroup.Item action href="#link2" disabled>
//             Link 2
//         </ListGroup.Item>
//         <ListGroup.Item action onClick={alertClicked}>
//             This one is a button
//         </ListGroup.Item>
//     </ListGroup>,
// );


class Profile extends Component {
    state = {  }
    render() {
        return (
            <Card className='mt-4 border-secondary'>
                <Card.Body>
                    <Card.Title><h1>Username: {this.props.auth?.name} </h1></Card.Title>
                    <Row className= "justify-content-center">
                        <Col xs={7}>
                    <ListGroup as="ul" className="mt-2">
                        <ListGroup.Item as="li" active>
                            <h3>General</h3>
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={alertClicked}>
                            <h3>Settings</h3>
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={alertClicked}>
                            <h3>Privacy</h3>
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={alertClicked}>
                            <h3>Call Settings</h3>
                        </ListGroup.Item>
                    </ListGroup>
                        </Col>
                    </Row>
                    <Button className="mt-4" variant="primary">Log Out</Button>
                    <Card>
                    </Card>
                </Card.Body>
            </Card>

        );
    }
}

export default Profile;