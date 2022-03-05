import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../API';


class Contacts extends Component {
    state = {
        showModal: false,
        gangs: [],
        people: [],
        team: "",
        name:"",
        error: null
    }


    componentDidMount() {
        this.requestTeams();
        this.requestPeople();
    }

    async requestTeams() {
        await API.get('/list_teams')
            .then(response => {
                this.setState({
                    gangs: response.data
                })
            },
                err => {
                    this.setState({ error: err.response })
                })
    }
    async requestPeople() {
        await API.get('/list_users')
            .then(response => {
                this.setState({
                    people: response.data
                })
            },
                err => {
                    this.setState({ error: err.response })
                })
    }
    
    showModal = (team) => {
        this.setState({ showModal: !this.state.showModal, team:team });
    };


    addTeam(name){
        console.log("here: " + this.state.team +"," +name)

            // e.preventDefault();
            // console.log("send: " + this.state.message);
    
            // let team_name = "jam"
            // let message = this.state.message.replaceAll(' ', '_');
    
            // API.get("/send_dm/" + team_name + "." + this.state.current_user + "." + message)
            // .then(response => {
            //     if(response.ok){
            //         this.setState({message: ""})
            //     }
                
            // })
            // .catch(err => this.setState({error: err.response}));
        
    }
    buttonPersonAdd(team) {

        return this.state.people.map(data2 => {
            console.log(team)
            return <div><Button key={data2.name} variant="primary" onClick= {()=>this.addTeam(data2.name)} >{data2.name} </Button><br></br></div>
        })
    }

    render() {
        return this.state.gangs.map(data => {
                return (
                    <div>
                        <Card key={data.team_name} style={{ width: '18rem' }} className='mt-4 border-danger' shadow={4}>
                            <Card.Body>
                                <Card.Title> {data.team_name}</Card.Title>
                                <Card.Text>
                                    
                                </Card.Text>
                                <Button variant="primary">View Gang</Button>
                                <Button id={this.index} onClick={() => this.showModal(data.team_name)} variant="primary">Add People to Gang</Button>
                            </Card.Body>

                            <Modal show={this.state.showModal}>
                                <Modal.Header closeButton onClick={() => this.showModal("")}>
                                    <Modal.Title>Add to Gang</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    {this.buttonPersonAdd(data.team_name)}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.showModal("")}>
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