import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Container, Row, Col} from "react-bootstrap";
import {Telephone} from "react-bootstrap-icons";
import Chat from "./Chat";
import YouTube from 'react-youtube';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import API from '../API';

class Gang extends Component {
    constructor(props) {
        super(props)
        this.requestPosts = this.requestPosts.bind(this)
        this.ytREF = React.createRef()
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.requestPosts()
            // console.log("POLLING")
        }, 500);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    state = { 
        id:this.props.match.params.id, 
        vid:'q6EoRBvdVPQ',
        vid_message: "",
        messages: [],
        chat_loading: true,
        player: null,
        last_action: "PAUSE"
    } 

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        this.setState({
            player: event.target
        });
        console.log("READY")
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

    youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    compare( a, b ) {
        if ( parseInt(a.timestamp) < parseInt(b.timestamp) ){
          return -1;
        }
        if ( parseInt(a.timestamp) > parseInt(b.timestamp) ){
          return 1;
        }
        return 0;
      }

    async requestPosts(){
        await API.get('/list_dms/' + this.state.id)
         .then(response => {this.setState({
             messages: response.data.sort(this.compare).reverse(), 
             chat_loading:false
         })
         console.log(this.state.messages[0]) 
         if (this.state.player != null) {
            if (this.state.messages[0].content == "🛑 I paused the vid !") {
                // console.log("PAUSING") 
                this.state.player.pauseVideo()
                // this.state.last_action = "PAUSE"
                // console.log("PAUSED")
            }
            if (this.state.messages[0].content == "🟢 I pressed play !") {
                // console.log("PLAYING")
                this.state.player.playVideo()
                // this.state.last_action = "PLAY"
                // console.log("PLAYED")
            }
            if (this.state.messages[0].content.startsWith("🎥 I changed the vid")) {
                console.log("CHANGING VID")
                this.setState({
                    vid: this.state.messages[0].content.split(" ")[6]
                })
                console.log("SHOULD BE " + this.state.messages[0].content.split(" ")[6])
                console.log("NEW VID " + this.state.vid)
            }
            
         }
        
         }, err => {
             this.setState({error: err.response})
         })
         console.log(this.state.vid)
     }

    async handleSubmit(e){
        e.preventDefault()
        this.setState({
            vid: (' ' + this.youtube_parser(this.state.vid_message)).slice(1),
            vid_message: ""
        })

        console.log("PLAY")
        let msg = "🎥 I changed the vid to " + this.youtube_parser(this.state.vid_message) + " !"
        await API.get("/send_dm/" + this.state.id + "." + localStorage.getItem("auth") + "." + msg)
        .then(response => {
            if(response.ok){
                this.setState({message: ""})
            }
            
        })
        .catch(err => this.setState({error: err.response}));
        this.requestPosts()
    }

    async notify_play() {
        console.log("PLAY")
        let msg = "🟢 I pressed play !"
        await API.get("/send_dm/" + this.state.id + "." + localStorage.getItem("auth") + "." + msg)
        .then(response => {
            if(response.ok){
                this.setState({message: ""})
            }
            
        })
        .catch(err => this.setState({error: err.response}));
        this.requestPosts()

        this.state.player.playVideo()
    }

    async notify_pause() {
        console.log("PAUSE")
        let msg = "🛑 I paused the vid !"
        await API.get("/send_dm/" + this.state.id + "." + localStorage.getItem("auth") + "." + msg)
        .then(response => {
            if(response.ok){
                this.setState({message: ""})
            }
            
        })
        .catch(err => this.setState({error: err.response}));
        this.requestPosts()
        this.state.player.pauseVideo()

    }

    async notify_summon() {
        console.log("SUMMON")
        let msg = "📣 The gang is about to watch a video !"
        await API.get("/send_dm/" + this.state.id + "." + localStorage.getItem("auth") + "." + msg)
        .then(response => {
            if(response.ok){
                this.setState({message: ""})
            }
            
        })
        .catch(err => this.setState({error: err.response}));
        this.requestPosts()
    }

    render() { 
        const opts = {
            height: '500',
            width: '750',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
        return (
            <Card className="w-100">
                <Card.Body>
                    <Container className='w-100 m-2' >
                        <Row className="d-flex w-100 xs=12">
                        <Col className="flex-left" xs={10}>
                             <Card.Title style={{"font-size":"30px"}}>Gang: {this.state.id}</Card.Title>                       
                        </Col>
                        {/* <Col ></Col> */}
                        <Col className="flex-right" xs={2}>
                            <Button variant="primary" onClick={() => this.notify_summon()}><span><Telephone/> Summon Gang</span></Button>
                        </Col>
                        </Row>
                    </Container>
                   
                    <Card className="mt-3">
                        <Card.Body>
                            <Row>
                                <Col xs={7}>
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                            <InputGroup>
                                            <Form.Control 
                                                type="input" 
                                                name="vid_message"
                                                value={this.state.vid_message}
                                                placeholder="enter new video url "
                                                onChange={this.handleChange.bind(this)}>
                                            </Form.Control>
                                            <Button type="submit">Send</Button>
                                            </InputGroup>
                                        </Form>
                                    <YouTube ref={this.ytREF} className="m-3" videoId={this.state.vid} opts={opts} onReady={this._onReady.bind(this)} />
                                        <Button className="m-3" onClick={() => this.notify_play()}>PLAY</Button>
                                        <Button className="m-3" type="submit" onClick={() => this.notify_pause()}>PAUSE</Button>
                                       
                                </Col>
                                <Col xs={5}>
                                    <Chat team={this.state.id} messages={this.state.messages} refresh={this.requestPosts} loading={this.state.chat_loading}></Chat>
                                </Col>
                            </Row>
                           
                            
                           
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        );
    }
}
 
export default Gang;