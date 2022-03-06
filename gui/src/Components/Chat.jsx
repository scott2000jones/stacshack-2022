import React, { Component } from 'react';
import {MessageList, MessageBox} from 'react-chat-elements';
import API from '../API';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row, Col } from 'react-bootstrap';
import timeSince from '../timeSince';

class Chat extends Component {
    state = { messages:[], current_user: localStorage.getItem("auth"), loading: true, error: null, message: "" } 

    componentDidMount(){
        this.props.refresh();
        this.scrollToBottom();
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            errors: []
        });
    }

    handleSubmit(e){
        e.preventDefault()
        // let message = this.state.message.replaceAll(' ', '_');
        let message = this.state.message;
        API.get("/send_dm/" + this.props.team + "." + this.state.current_user + "." + message)
        .then(response => {
            if(response.ok){
                this.setState({message: ""})
            }
        })
        .catch(err => this.setState({error: err.response}));
        this.props.refresh();
        this.setState({message: ""})

    }

    render() { 
        return (
            <Card className="w-100" style={{"height":"600px"}}>
                <Card.Body style={{"overflow-y":"scroll"}}>
                    <Card.Title>Messages</Card.Title>
                    {this.state.error != null ? <Alert>Error: {this.state.error}</Alert> : <p></p>} 
                    {this.props.loading ? <h1>Loading</h1> :
                <Container>
                    <Row>
                        {this.props.messages.reverse().map(msg =>(
                            <div className="d-flex">
                            {msg.sent_by == this.state.current_user ?  
                            <>
                            <Col></Col>
                            <Col>
                            <Toast position={'top-end'}>
                                <Toast.Header closeButton={false} style={{background:"#85040E"}} >
                                    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                                    <strong className="me-auto">ME</strong>
                                    <small>{timeSince(msg.timestamp)} ago</small>
                                </Toast.Header>
                                <Toast.Body textAlign={'Right'}>{msg.content}</Toast.Body>
                            </Toast>
                            </Col>
                            </> :
                            <>
                            <Col>
                                <Toast>
                                    <Toast.Header closeButton={false} >
                                        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                                        <strong className="me-auto">{msg.sent_by}</strong>
                                        <small>{timeSince(msg.timestamp)} ago</small>
                                    </Toast.Header>
                                    <Toast.Body>{msg.content}</Toast.Body>
                                </Toast>
                                </Col>
                                <Col></Col>
                            </>
                            }
                            </div>
                        )
                    )}
                    <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
                    </Row>
                    </Container>
            }
                </Card.Body>
                
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <InputGroup>
                <Form.Control 
                    type="input" 
                    name="message"
                    value={this.state.message}
                    placeholder="type new message here..."
                    onChange={this.handleChange.bind(this)}>
                </Form.Control>
                <Button type="submit">Send</Button>
                </InputGroup>
                
            </Form>
          
            
            </Card>
           
        );    
    }
}
 
export default Chat;