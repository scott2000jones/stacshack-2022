import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


class Welcome extends Component {
    state = {  } 
    render() { 
        return (
        <Card className='mt-4 border-secondary'>
            <Card.Body>
                <Card.Title>Hello World</Card.Title>
                <Button variant="primary">Click Me</Button>

                <Card>
                    
                </Card>
            </Card.Body>
        </Card>
        );
    }
}
 
export default Welcome;