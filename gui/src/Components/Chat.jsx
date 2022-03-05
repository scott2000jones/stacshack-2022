import React, { Component } from 'react';
import {MessageList, MessageBox} from 'react-chat-elements';
import API from '../API';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import timeSince from '../timeSince';


class Chat extends Component {
    state = { messages:[], loading: true, error: null } 

    componentDidMount(){
        this.requestPosts();

    }

    async requestPosts(){
       await API.get('/list_all_dms')
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
                       <Toast>
                        <Toast.Header closeButton={false}>
                            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                            <strong className="me-auto">{msg.sent_by}</strong>
                            <small>{timeSince(msg.timestamp)} ago</small>
                        </Toast.Header>
                        <Toast.Body>{msg.content}</Toast.Body>
                       </Toast>
                    );
                })
            }
            {this.state.error != null ? <Alert>Error: {this.state.error}</Alert> : <p></p>} 
            
            </Card>
           
        );    
    }
}
 
export default Chat;