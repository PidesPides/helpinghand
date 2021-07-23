import React, { Component } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { ServicePathsLabel, PathsLabel, Roles } from './Paths.js';

class Feed extends Component{
    constructor(props){
        super(props)
        this.state = {
            feed:[]
        }
    }
    
    async componentDidMount(){
        var feedAux=[];
        var urlFeed=ServicePathsLabel.ApiProd + Roles.User + sessionStorage.getItem('id') + PathsLabel.Feed + "?tokenId=" + sessionStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }  
        await fetch(urlFeed,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                var obj = data[i];
                var feedInfo = {
                      info:obj.message
                }
                    feedAux.push(feedInfo);
                }   
            });
            this.setState({feed:feedAux})
    }
    
//como fazer aparecer o feed
    render() {
        return(
           <Container>
                <Row xs={1} md={2}>
                    {this.state.feed.map((feedInfo,index)=>
                        <Col>
                            <Card border="info" style={{ width: '24rem' , height:'9rem' , margin:'1rem'}}>
                                <Card.Body>
                                <Card.Title><b>Notificação {index+1}</b></Card.Title>
                                    <Card.Text>-{feedInfo.info}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
           </Container>
        )
    }
}
export default Feed;