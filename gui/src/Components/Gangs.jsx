import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../API';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';

import Gang from './Gang';



class Gangs extends Component {
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
        await API.get('/teams_for_user/' + localStorage.getItem("auth"))
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
            API.get("/add_user_to_team/" + this.state.team + "." + name )
            .then(response => {
                if(response.ok){
                    this.setState({showModal: false})
                }
                
            })
            .catch(err => this.setState({error: err.response}));
        
    }
    buttonPersonAdd() {

        return this.state.people.map(data2 => {
            return <div><Button className="mt-2" key={data2.name} variant="outline-primary" onClick= {()=>this.addTeam(data2.name)} >{data2.name} </Button><br></br></div>
        })
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
        let gang = this.state.gang.replaceAll(' ', '_');


        API.get("/create_team/"+ gang+"."+localStorage.getItem("auth"))
        .then(response => {
            if(response.ok){
                this.setState({message: ""})
            }
            
        })
        .catch(err => this.setState({error: err.response}));
    }
    render() {
        return(
              
            <Container fluid className="d-flex justify-content-md-center">
                 <Form onSubmit={this.handleSubmit.bind(this)}>
                <InputGroup>
                <Form.Control 
                    type="input" 
                    name="gang"
                    value={this.state.gang}
                    placeholder="Type new Gang"
                    onChange={this.handleChange.bind(this)}>
                </Form.Control>
                <Button type="submit">Send</Button>
                </InputGroup>
                
            </Form>
                {this.state.gangs.map(data => (
                    <Col lg='auto'>
                        <Card key={data} style={{ width: '18rem' }} className='mt-4 m-2 border-danger' shadow={4}>
                            <Card.Body>
                                <Card.Title> {data}</Card.Title>
                                <Card.Text>
                                    
                                </Card.Text>
                                <Link to={"/gang/" + data}>
                                    <Button className="mt-2" variant="primary">
                                        <span>View Gang</span>
                                    </Button>
                                </Link>

                                <Button className="mt-2" id={this.index} onClick={() => this.showModal(data)} variant="primary">Add People to Gang</Button>
                            </Card.Body>

                            <Modal show={this.state.showModal}>
                                <Modal.Header closeButton onClick={() => this.showModal("")}>
                                    <Modal.Title>Add to Gang</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    {this.buttonPersonAdd()}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.showModal("")}>
                                        Close
                            </Button>
                                </Modal.Footer>
                            </Modal>
                        </Card>
                    </Col>
                ))}
            </Container>
        )
    }


}

export default Gangs;