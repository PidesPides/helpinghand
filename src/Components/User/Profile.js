//imports
import React,{ Component } from 'react';
import { Table,Form,Card,Col,Row,Container,Tab,Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ServicePathsLabel,PathsLabel } from '../Common/Utils/Paths.js';
import Avatar from 'react-avatar';
import dateFormat from 'dateformat';
import Popup from 'reactjs-popup';

class Profile extends Component{

    constructor(props){
        super(props)
        this.state={
            username:'',
            phone:'',
            addr1:'',
            addr2:'',
            city:'',
            zip:'',
            cards:[]
        }
        this.onChange = this.onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value });
    console.log(this.state)
    }

    //pedido de get
    //ISTO TEM DE SER UM COMPONENTDIDMOUNT
    //ir buscar os eventos/ajudas do user
    async componentDidMount(){
        //url para o profile
        var urlProfile = ServicePathsLabel.ApiProd + ServicePathsLabel.User + "/" + sessionStorage.getItem('id')
        + PathsLabel.UpdateInfo + '?tokenId=' + sessionStorage.getItem('token');
        var urlHelp = ServicePathsLabel.ApiProd  + ServicePathsLabel.User +"/" + sessionStorage.getItem('id') + "/" + PathsLabel.Help + '?tokenId=' + sessionStorage.getItem('token'); 
        var urlEvent = ServicePathsLabel.ApiProd  + ServicePathsLabel.User +"/" + sessionStorage.getItem('id') + "/events" + '?tokenId=' + sessionStorage.getItem('token');
        console.log(urlEvent)
        //links para instituiçao
        //
        //var
        var cardsAux=[];
        //fazer requestsOptions    
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        
        //fazer fetch
        await fetch(urlProfile,requestOptions)
        .then(response => response.json())
        .then(data => this.setState({
            phone: data.phone,
            addr1: data.address1,
            addr2: data.address2,
            zip: data.zipcode,
            city: data.city
        })).catch(
            //arrow functions
        );

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
        console.log(this.state.cards)
    }       
    //ver layout no paint
    //tabela com 2 rows
    //1º row - imagem e def.
    //2ºrow - 2 tabs(info de conta-ajuda/evento criado)
    //fazer form com readonly
    render(){
        return(
            <Form>
                <Container>
                    <Row>{/*//Everything*/}

                        <Col lg={4}>{/*//main col1*/}
                        {/*//avatar + nome
                        */}
                            <Row  className="p-5 mx-auto">
                                <Avatar githubHandle="PidesPides" size="200" round={true} />
                                {/**
                                mudar foto:
                                abrir popup que mostra as varias fotos
                                escolher uma e mudar
                                <div>
                                    <input type="file"/>
                                </div>
                                 */}
                            </Row>
                            <Row className="mx-auto">
                                <Link to="/profilesettings">Definições de Conta</Link>
                            </Row>
                            

                        </Col>
                        <Col lg={8}>{/*/main col2*/}
                            <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="info" title="Informação de conta">
                                    <Row>

                                        <Col>
                                            <Form.Group controlId="formUsername">
                                                <Form.Label ><u>Username</u></Form.Label>
                                                <Form.Control readOnly defaultValue={sessionStorage.getItem('id')} />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group controlId="formPhone">
                                                <Form.Label ><u>Telefone</u></Form.Label>
                                                <Form.Control readOnly defaultValue={this.state.phone} />
                                            </Form.Group>
                                        </Col>


                                    </Row> 

                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formCity">
                                                <Form.Label ><u>Cidade</u></Form.Label>
                                                <Form.Control readOnly defaultValue={this.state.city} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="formAddr1">
                                                <Form.Label ><u>Morada</u></Form.Label>
                                                <Form.Control readOnly defaultValue={this.state.addr1} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formAddr2">
                                                <Form.Label ><u>Morada alternativa</u></Form.Label>
                                                <Form.Control readOnly defaultValue={this.state.addr2} />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group controlId="formZip">
                                                    <Form.Label ><u>Código Postal</u></Form.Label>
                                                    <Form.Control readOnly defaultValue={this.state.zip} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="gets" title="Ajudas/Eventos criados">
                                    {/**fazer cards aqui 
                                    usar nova componente*/}
                                    <Row xs={1} md={2}>
                                             {this.state.cards.map((card,index) => {
                                                if(!card.isEvent){  
                                                    return( 
                                                    <Col>
                                                    <Card border="danger" style={{ width: '21rem' , height:'10rem' , margin:'1rem'}}>
                                                        <Card.Body>
                                                        <Card.Title><b>{card.name}</b></Card.Title>
                                                            <Card.Text fontsize="1.2rem">
                                                                <p>Descrição:{card.description}</p>
                                                                <Popup trigger={
                                                                    <Card.Link href="#profile">Mais info</Card.Link>
                                                                    }
                                                                    position="right top"
                                                                    modal
                                                                    nested
                                                                >
                                                                {/**falta por resto e botoes com handles! */}
                                                                <div>
                                                                    <p><u>Descrição:</u> {card.description}</p>
                                                                    <p><u>Data:</u> {dateFormat(card.time,"default")}</p>
                                                                    <p>Descrição</p>
                                                                </div>
                                                                </Popup>
                                                            </Card.Text>
                                                        </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    );
                                                }
                                                else{
                                                    return(
                                                        <Col>
                                                        <Card border="warning" style={{ width: '21rem' , height:'10rem' , margin:'1rem'}}>
                                                        <Card.Body>
                                                        <Card.Title><b>{card.name}</b></Card.Title>
                                                            <Card.Text fontsize="1.2rem">
                                                                <p>Descrição: {card.description}</p>
                                                                <Popup trigger={
                                                                    <Card.Link href="#profile">Mais info</Card.Link>
                                                                    } 
                                                                    position="right top"
                                                                    modal
                                                                    nested
                                                                >
                                                                {/**falta por resto e botoes com handles! */}
                                                                <div>
                                                                    <p><u>Descrição:</u> {card.description}</p>
                                                                    <p><u>Data de Inicio:</u> {dateFormat(card.start,"default")}</p>
                                                                    <p><u>Data de Fim:</u> {dateFormat(card.end,"default")}</p>
                                                                </div>
                                                                </Popup>
                                                            </Card.Text>
                                                        </Card.Body>
                                                        </Card>
                                                        </Col>
                                                    )
                                                }
                                                
                                             })}
                                    </Row>
                                    {/**<Link to="/profile" component={Cards}/>*/}
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>   
            </Form>   
        )
    }

}
export default Profile;


/*
 <h4><u>Infomação do Utilizador</u></h4>
                            


                            <Row>

                            
                            <h4><u>Ajudas/Eventos criados</u></h4>
                            {/*cartoes
                                
                            </Row>
*/