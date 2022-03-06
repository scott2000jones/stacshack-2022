import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


class Profile extends Component {
    state = {  }
    render() {
        return (
            <Card className='mt-4 border-secondary'>
                <Card.Body>
                    <Card.Title>Username: {this.props.auth?.name}</Card.Title>
                    <Button className="mt-2" variant="primary">Log Out</Button>
                    <Card>
                    </Card>
                </Card.Body>
            </Card>
        );
    }
}

export default Profile;