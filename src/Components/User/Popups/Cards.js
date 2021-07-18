import React, { Component } from 'react';
import {Card, Row, Col } from 'react-bootstrap';
import { PathsLabel, ServicePathsLabel, Roles } from '../../Common/Utils/Paths';
class Cards extends Component{

    constructor(props){
        super(props)
        this.state={ 
           
        }
    }
    async componentDidMount(){
    //por os dois urls e arrayAux
        var urlHelp= ServicePathsLabel.ApiProd + PathsLabel.User + sessionStorage.getItem('id') + "/" + PathsLabel.Help + '?tokenId=' + sessionStorage.getItem('token'); 
        var urlEvent= ServicePathsLabel.ApiProd + PathsLabel.User + sessionStorage.getItem('id') + "/events" + '?tokenId=' + sessionStorage.getItem('token');
        var cardsAux=[];

         const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        //dois fetches com await
        await fetch(urlHelp,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    //addCards por a localizacao?
                    var card = {
                        creator:obj.creator,
                        description:obj.description,
                        name:obj.name,
                        time:obj.time,
                        isEvent: false,
                        id:obj.id
                    }
                    cardsAux.push(card);
                }
            });

         await fetch(urlEvent,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                var obj = data[i];
                //addCard e usar start e end OK - e por location?
                var card = {
                        creator:obj.creator,
                        description:obj.description,
                        name:obj.name,
                        start:obj.start,
                        end:obj.end,
                        isEvent: true,
                        id:obj.id
                    }
                    cardsAux.push(card);
                }
                
            });
        //processo igual ao mapas para guardar numa lista
        this.setState({cards:cardsAux});
    }


    render(){
        return(
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: this.state.cards.length }).map((_, idx) => (
                <Col>
                <Card style={{ width: '22rem' , height:'9rem' , margin:'1rem'}}>
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
                </Card>
                </Col>
                ))}
            </Row>
)
    }
}
export default Cards;