import React, { Component } from 'react';
import {MessageList, MessageBox} from 'react-chat-elements';
import API from '../API';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import timeSince from '../timeSince';


class Chat extends Component {
    state = { messages:[], current_user: localStorage.getItem("auth"), loading: true, error: null, message: "" } 

    componentDidMount(){
        this.requestPosts();

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
        let message = this.state.message.replaceAll(' ', '_');


        API.get("/send_dm/" + this.props.team + "." + this.state.current_user + "." + message)
        .then(response => {
            if(response.ok){
                this.setState({message: ""})
            }
            
        })
        .catch(err => this.setState({error: err.response}));
    }

    async requestPosts(){
       await API.get('/list_dms/' + this.props.team)
        .then(response => {this.setState({
            messages: response.data, 
            loading:false
        })
        }, err => {
            this.setState({error: err.response})
        })
    }
    

    render() { 
        return (
            <Card>
                {this.state.loading ? <h1>Loading</h1> :

                this.state.messages.map(msg =>{
                    return(
                        <div className="d-flex">
                        {msg.sent_by == this.state.current_user ?  <Toast>
                            <Toast.Header closeButton={false} style={{background:"#85040E"}}className="flex-right">
                                {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                                <strong className="me-auto">ME</strong>
                                <small>{timeSince(msg.timestamp)} ago</small>
                            </Toast.Header>
                            <Toast.Body>{msg.content}</Toast.Body>
                           </Toast> :
                            <Toast>
                                <Toast.Header closeButton={false}>
                                    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                                    <strong className="me-auto">{msg.sent_by}</strong>
                                    <small>{timeSince(msg.timestamp)} ago</small>
                                </Toast.Header>
                                <Toast.Body>{msg.content}</Toast.Body>
                            </Toast>
                        }
                        </div>
                    );
                })
            }
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
            {this.state.error != null ? <Alert>Error: {this.state.error}</Alert> : <p></p>} 
            
            </Card>
           
        );    
    }
}
 
export default Chat;