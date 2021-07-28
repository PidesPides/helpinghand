import React,{ Component } from 'react';
import { Row, Col, Container,Button } from 'react-bootstrap';
import { ServicePathsLabel, PathsLabel } from '../../Common/Utils/Paths.js';

class Participants extends Component{
    constructor(props) {
        super(props)
        this.state= {
            participants:[]
        }
    }

    async componentDidMount() {
        var participantsAux=[];
        var urlParticipants=ServicePathsLabel.ApiProd + PathsLabel.Event
        + "/" + this.props.cardId + PathsLabel.ListPartic 
        +'?tokenId=' + sessionStorage.getItem('token');

        const requestOptions={
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }  
        }
        
        await fetch(urlParticipants,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var participant = {
                        id:obj.id,
                        creation:obj.creation,
                        email:obj.email,
                        status:obj.status.toString(),
                        visibility:obj.visibility.toString()
                    }
                    participantsAux.push(participant);
                }
            });
        this.setState({participants:participantsAux});
    }

    render() {
        /*
        const length = this.state.participants.length;
        var isNull = false;
        if(length === 0){
            isNull = true;
        }
        else{
            isNull = false;
        }
        */
        return(
            <Container>
                <Row xs={1} md={2}>
                    {this.state.participants.map((participant,index) => {
                        return(
                        <Row>
                            <div>
                                <Col>
                                    <p><u>Nome:</u>{participant.id}</p>
                                    <p><u>Email:</u>{participant.email}</p>
                                    <p><u>Visibilidade:</u>{participant.visibility}</p>
                                </Col>
                            </div>
                        </Row>                    
                        )
                    })}
                </Row>
            </Container>

        )   
    }
}
export default Participants;
    