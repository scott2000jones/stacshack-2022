import React, { Component } from 'react';
import {MessageList, MessageBox} from 'react-chat-elements';
import API from '../API';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';


class Chat extends Component {
    state = { messages:[], loading: true, error: null } 

    componentDidMount(){
        this.requestPosts();
    }

    async requestPosts(){
       await API.get('/list_dms')
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
                        <MessageBox
                            key={msg.timestamp}
                            position={'left'}
                            title={msg.sent_by}
                            text={msg.content}
                            type={'text'}

                        >
                            
                        </MessageBox>
                    );
                })

                
            }
            {this.state.error != null ? <Alert>Error: {this.state.error}</Alert> : <p></p>} 
            
            </Card>
           
        );    
    }
}
 
export default Chat;