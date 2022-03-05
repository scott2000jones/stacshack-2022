import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';



class Contacts extends Component {
    state = {

        contacts: [["Hackathon", "Join for Fun"], ["CS Ball", "Matrix Theme, join for info"], ["CS4099", "Dissertation"]]
    }
    render() {

        return this.state.contacts.map(data => {
            return (
                <div>
                    <Card  style={{ width: '18rem' }} className='mt-4 border-danger' shadow={4}>
                        <Card.Body>
                            <Card.Title> {data[0]}</Card.Title>
                            <Card.Text>
                                {data[1]}
                            </Card.Text>
                            <Card.Link href="#">Add People to Team</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            )
        })

    }
}

export default Contacts;