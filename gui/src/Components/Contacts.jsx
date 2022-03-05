import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class Contacts extends Component {
    state = {
        showModal: false,
        gangs: [["Hackathon", "Join for Fun"], ["CS Ball", "Matrix Theme, join for info"], ["CS4099", "Dissertation"]],
        people: ["Katy","Ira","Rhona"],
    }
  

    showModal = () => {
        this.setState({ showModal: !this.state.showModal });
      };
  
   
    render(){
        return this.state.gangs.map(data => {
            return (
                <div>
                   
                    
                    <Card  style={{ width: '18rem' }} className='mt-4 border-danger' shadow={4}>
                        <Card.Body>
                            <Card.Title> {data[0]}</Card.Title>
                            <Card.Text>
                                {data[1]}
                            </Card.Text>                          
                            <Button variant="primary">View Gang</Button>
                            <Button id = {this.index} onClick= {this.showModal}variant="primary">Add People to Gang</Button>
                        </Card.Body>

                        <Modal show= {this.state.showModal}>
                        <Modal.Header closeButton onClick={() => this.showModal()}>
                        <Modal.Title>Add to Gang</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                        <Button  variant="primary">{this.state.people[0]}</Button><br></br>
                        <Button  variant="primary">{this.state.people[1]}</Button><br></br>
                        <Button  variant="primary">{this.state.people[2]}</Button><br></br>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.showModal()}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </Card>


                    
                </div>
                
            )
        })
        
    }

       
}

export default Contacts;