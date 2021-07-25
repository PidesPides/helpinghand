//imports
import React,{ Component } from 'react';
import { Form, Card, Col, Row, Button, Container, Image, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ServicePathsLabel,PathsLabel } from '../Common/Utils/Paths.js';
import dateFormat from 'dateformat';
import Popup from 'reactjs-popup';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Images from './Popups/Images.js';
import Helpers from './Popups/Helpers.js';
import Participants from './Popups/Participants.js';
import Maps from '../Common/Utils/Maps.js';

class Profile extends Component{

    constructor(props){
        super(props)
        this.state={
            username:'',
            name:'',
            bio:'',
            email:'',
            dataCreation:'',
            visibility:true,
            avatarUrl:'',
            initials:'',
            categories:[],
            phone:'',
            addr1:'',
            addr2:'',
            rating:'',
            reliability:'',
            city:'',
            zip:'',
            cards:[],
            mine:[]
        }
        this.onChange = this.onChange.bind(this);
        this.handleFinishHelp = this.handleFinishHelp.bind(this);
        this.handleFinishEvent = this.handleFinishEvent.bind(this);
        this.handleCancelHelp = this.handleCancelHelp.bind(this);
        this.handleCancelEvent = this.handleCancelEvent.bind(this);
        this.handleShowOnMap = this.handleShowOnMap.bind(this);
    }

    onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value });
    console.log(this.state)
    }

    //ir buscar os eventos/ajudas do user e profile
    async componentDidMount(){
        //urls
        var urlAcc =  ServicePathsLabel.ApiProd + ServicePathsLabel.User + "/" + sessionStorage.getItem('id') + PathsLabel.Account + '?tokenId=' + sessionStorage.getItem('token');
        var urlInfo = ServicePathsLabel.ApiProd + ServicePathsLabel.User + "/" + sessionStorage.getItem('id') + PathsLabel.UpdateInfo + '?tokenId=' + sessionStorage.getItem('token');
        var urlStats = ServicePathsLabel.ApiProd + ServicePathsLabel.User + "/" + sessionStorage.getItem('id') + PathsLabel.Stats + "?tokenId=" + sessionStorage.getItem('token');
        var urlHelp = ServicePathsLabel.ApiProd  + ServicePathsLabel.User +"/" + sessionStorage.getItem('id') + "/" + PathsLabel.Help + '?tokenId=' + sessionStorage.getItem('token'); 
        var urlEvent = ServicePathsLabel.ApiProd  + ServicePathsLabel.User +"/" + sessionStorage.getItem('id') + "/events" + '?tokenId=' + sessionStorage.getItem('token');
        var urlHelpSub =  ServicePathsLabel.ApiProd  + ServicePathsLabel.User +"/" + sessionStorage.getItem('id') + PathsLabel.Helping + '?tokenId=' + sessionStorage.getItem('token');
        var urlEventSub =  ServicePathsLabel.ApiProd  + ServicePathsLabel.User +"/" + sessionStorage.getItem('id') + PathsLabel.Participating  + '?tokenId=' + sessionStorage.getItem('token');
        var urlProfileUser = ServicePathsLabel.ApiProd + ServicePathsLabel.User + "/" + sessionStorage.getItem('id') + PathsLabel.Profile +'?tokenId=' + sessionStorage.getItem('token');
        var urlProfileInst = ServicePathsLabel.ApiProd + ServicePathsLabel.Institution + "/" + sessionStorage.getItem('id') + PathsLabel.Profile +'?tokenId=' + sessionStorage.getItem('token');
        var cardsAux=[];
        var mineAux=[];
        //fazer requestsOptions    
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        
        //fazer fetch
        
        await fetch(urlInfo,requestOptions)
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
    
        await fetch(urlAcc,requestOptions)
        .then(response => response.json())
        .then(data => this.setState({
            email: data.email,
            id: data.id,
            dataCreation: dateFormat(data.creation,"dd/mm/yyyy"),
            status: data.status,
            visibility: data.visibility
        })).catch(
            //arrow functions
        );

         if(sessionStorage.getItem('role') !== "INSTITUTION"){
            await fetch(urlProfileUser,requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                name: data.name,
                bio: data.bio,
                visibility: data.visibility,
                avatarUrl: data.avatar
            })).catch(
                //arrow functions<
            );

            await fetch(urlStats,requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                rating: data.rating,
                reliability: data.reliability
            })).catch(
                //arrow functions<
            );
            this.multReliab();

            await fetch(urlHelpSub,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    //addCards por a localizacao?
                    var card = {
                        creator:obj.creator,
                        description:obj.description,
                        name:obj.name,
                       location: {
                            lat: obj.location[0],
                            lng: obj.location[1]
                        },
                        time:obj.time,
                        isEvent: false,
                        id:obj.id
                    }
                    mineAux.push(card);
                }
            });

             await fetch(urlEventSub,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                var obj = data[i];
                //addCard e usar start e end OK - e por location?
                var card = {
                        creator:obj.creator,
                        description:obj.description,
                        name:obj.name,
                        location: {
                            lat: obj.location[0],
                            lng: obj.location[1]
                        },
                        start:obj.start,
                        end:obj.end,
                        isEvent: true,
                        id:obj.id
                    }
                    mineAux.push(card);
                }   
            });

        }

        //receber variaveis extra
        if(sessionStorage.getItem('role') === "INSTITUTION"){
            await fetch(urlProfileInst,requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                name: data.name,
                bio: data.bio,
                visibility: data.visibility,
                avatarUrl: data.avatar,
                initials: data.initials,
                categories: data.categories
            })).catch(
                //arrow functions<
            );
        }
       
        
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
                       location: {
                            lat: obj.location[0],
                            lng: obj.location[1]
                        },
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
                        location: {
                            lat: obj.location[0],
                            lng: obj.location[1]
                        },
                        start:obj.start,
                        end:obj.end,
                        isEvent: true,
                        id:obj.id
                    }
                    cardsAux.push(card);
                }   
            });

           
        //processo igual ao mapas para guardar numa lista
        this.setState({ cards:cardsAux });
        this.setState({ mine:mineAux });
    } 

    handleFinishEvent(e){
        //url
        const cardId = e.target.id;
        var url=ServicePathsLabel.ApiProd + PathsLabel.Event + "/" + cardId + PathsLabel.End + "?tokenId=" + sessionStorage.getItem('token');
        //requestoptions
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
        //fetch
        fetch(url,requestOptions) 
        .then(response => {
            if (response.ok) {
                swal("O evento foi concluído com sucesso","","success");
            }else{
                this.setState({error: response.statusText});
                throw new Error(response.statusText);
            }
        })
    }

    handleCancelEvent(e){
        const cardId = e.target.id;
        var url=ServicePathsLabel.ApiProd + PathsLabel.Event + "/" + cardId + '?tokenId=' + sessionStorage.getItem('token');
        //requestoptions
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        }                     
        swal({
            title: "Tem a certeza que quer cancelar o evento?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("O evento foi cancelado com sucesso", {
                icon: "success",
                });
                fetch(url,requestOptions)
                .then(response => {
                    if(!response.ok)
                        throw new Error(response.statusText);
                    window.location.reload();
                })
                .catch(error =>{

                })    
            } 
        });
    }

    handleLeaveEvent(e){
        const cardId = e.target.id;
        var url = ServicePathsLabel.ApiProd + PathsLabel.Event + "/" + cardId + PathsLabel.Leave +'?tokenId=' + sessionStorage.getItem('token');
        //rest/event/cardId/leave/tokenId
        
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        }                     
        swal({
            title: "Tem a certeza que quer deixar o evento?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Deixaste o evento com sucesso", {
                icon: "success",
                });
                fetch(url,requestOptions)
                .then(response => {
                    if(!response.ok)
                        throw new Error(response.statusText);
                    window.location.reload();
                })
                .catch(error =>{

                })    
            } 
        });
        
    }

    handleFinishHelp(e){
        const cardId = e.target.id;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
        Swal.fire({
            title: 'Como avalias a ajuda que recebeste?',
            icon: 'question',
            input: 'range',
            inputAttributes: {
                min: 1,
                max: 5,
                step: 1
            },
            inputValue: 3
            }).then((result) => {
            if (result.isConfirmed) {
                const rating = Swal.getInput().value;
                var url = ServicePathsLabel.ApiProd + PathsLabel.Help + "/" 
                + cardId + PathsLabel.Finish + '?tokenId=' + sessionStorage.getItem('token') + '&rating=' + rating;
                fetch(url,requestOptions)
                .then(response => {
                    if (response.ok) {
                        swal("Ajuda concluída com sucesso","","success");
                //mais alguma coisa'
                    }else{
                        this.setState({error: response.statusText});
                        throw new Error(response.statusText);
                    }
                })
            }
        })
    }     

    handleCancelHelp(e){
        //url
        const cardId = e.target.id;
        var url=ServicePathsLabel.ApiProd + PathsLabel.Help + "/" + cardId + '?tokenId=' + sessionStorage.getItem('token');;
        //requestoptions
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}   
        };                     
        swal({
            title: "Tem a certeza que quer cancelar a ajuda?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("A ajuda foi cancelada com sucesso", {
                icon: "success",
                });
                fetch(url,requestOptions)
                .then(response => {
                    if(!response.ok)
                        throw new Error(response.statusText);
                })
                .catch(error =>{
                })    
            } 
        });
    }

    handleLeaveHelp(e){
        const cardId = e.target.id;
        var url = ServicePathsLabel.ApiProd + PathsLabel.Help + "/" + cardId + PathsLabel.Leave +'?tokenId=' + sessionStorage.getItem('token');
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        }                     
        swal({
            title: "Tem a certeza que quer deixar a ajuda?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Deixaste a ajuda com sucesso", {
                icon: "success",
                });
                fetch(url,requestOptions)
                .then(response => {
                    if(!response.ok)
                        throw new Error(response.statusText);
                    window.location.reload();
                })
                .catch(error =>{

                })    
            } 
        });
    }

    handleShowOnMap(e,value1,value2){
        var locationLat = value1;
        var locationLng = value2;
        sessionStorage.setItem('lat',locationLat);
        sessionStorage.setItem('lng',locationLng);
        //linkar para o mapa
    }

    multReliab(){
        var finalR= parseFloat((this.state.reliability*100)).toFixed(2) + "%";
        this.setState({reliability:finalR});
    }
    //ver layout no paint
    //tabela com 2 rows
    //1º row - imagem e def.
    //2ºrow - 2 tabs(info de conta-ajuda/evento criado)
    //fazer form com readonly
    //por rating no profile!!!
    render(){
        var isUser = false;
        if(sessionStorage.getItem("role") === "USER"){
            isUser = true;
        }        
        return(
            <Form>
                <Container>
                    <Row>{/*//Everything*/}
                        <Col lg={4}>{/*//main col1*/}
                        {/*//avatar + nome
                        */}
                            <Row  className="p-5 mx-auto">
                                {/**
                                mudar foto:
                                abrir popup que mostra as varias fotos
                                escolher uma e mudar
                                 */}
                                <div >

                                     <Image className="m-4" style={{border: "solid" ,color: "CornflowerBlue" }}
                                      src={this.state.avatarUrl} />
                                    {/**botao para mudar a imagem -> vai ser popup */}
                                    <Popup trigger={
                                        <Button variant="link">Alterar imagem de perfil
                                        </Button>
                                    }
                                    position="right top"
                                    modal
                                    >
                                        <Images />
                                    </Popup>
                                    <Link className="m-4" to="/profilesettings">Definições de Conta</Link>
                                </div> 
                            </Row>
                            <Row className="p-0">
                            </Row>
                        </Col>
                        <Col lg={8}>{/*/main col2*/}
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="profile" title="Perfil">
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formName">
                                                <Form.Label ><u>Nome</u></Form.Label>
                                                <Form.Control readOnly defaultValue={this.state.name} />
                                            </Form.Group>
                                            {
                                                this.state.visibility &&

                                                <Form.Group controlId="formVisibility">
                                                    <Form.Label ><u>Visibilidade</u></Form.Label>
                                                    <Form.Control readOnly defaultValue={"Público"} />
                                                </Form.Group>
                                            }
                                            {
                                                !this.state.visibility &&

                                                <Form.Group controlId="formVisibility">
                                                    <Form.Label ><u>Visibilidade</u></Form.Label>
                                                    <Form.Control readOnly defaultValue={"Privado"} />
                                                </Form.Group>
                                            }
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="formBio">
                                                <Form.Label ><u>Bio</u></Form.Label>
                                                <Form.Control as="textarea" rows={4}  readOnly defaultValue={this.state.bio} />
                                            </Form.Group>
                                        </Col>
                                    </Row> 
                                    {
                                        isUser &&

                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formRating">
                                                    <Form.Label ><u>Classificação</u></Form.Label>
                                                    <Form.Control readOnly defaultValue={this.state.rating} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formReliability">
                                                    <Form.Label ><u>Fiabilidade</u></Form.Label>
                                                    <Form.Control readOnly defaultValue={this.state.reliability} />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                    }
                                </Tab>
                                <Tab eventKey="info" title="Info de conta">
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
                                            <Form.Group controlId="formEmail">
                                                <Form.Label ><u>Email</u></Form.Label>
                                                <Form.Control readOnly defaultValue={this.state.email} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="formDataCreation">
                                                <Form.Label ><u>Data de Criação</u></Form.Label>
                                                <Form.Control readOnly defaultValue={this.state.dataCreation} />
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
                                                                    <p><u>Id:</u> {card.id}</p>
                                                                    <Button id={card.id} variant="outline-success" size="sm" onClick={this.handleFinishHelp}>Concluir Ajuda</Button>
                                                                    <Button id={card.id} variant="outline-danger" size="sm" onClick={this.handleCancelHelp}>Cancelar Ajuda</Button>
                                                                    <Link to="/maps">
                                                                        <Button value={card.location.lat, card.location.lng} variant="outline-info" size="sm"
                                                                        onClick={(e) => this.handleShowOnMap(e,card.location.lat, card.location.lng)}>Mostrar no Mapa</Button> 
                                                                    </Link>          
                                                                </div>
                                                                </Popup>
                                                                <Popup trigger={
                                                                    <Card.Link href="#profile">Escolher ajudante</Card.Link>
                                                                    }
                                                                    position="right top"
                                                                    modal
                                                                    nested
                                                                >
                                                                <Helpers cardId={card.id} />
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
                                                                <div>
                                                                    <p><u>Descrição:</u> {card.description}</p>
                                                                    <p><u>Data de Inicio:</u> {dateFormat(card.start,"default")}</p>
                                                                    <p><u>Data de Fim:</u> {dateFormat(card.end,"default")}</p>
                                                                    <p><u>Id:</u> {card.id}</p>
                                                                    <Button id={card.id} variant="outline-success" size="sm" onClick={this.handleFinishEvent}>Concluir Evento</Button>
                                                                    <Button id={card.id} variant="outline-danger" size="sm" onClick={this.handleCancelEvent}>Cancelar Evento</Button>
                                                                   <Link to="/maps">
                                                                        <Button value={card.location.lat,card.location.lng} variant="outline-info" size="sm"
                                                                        onClick={(e) => this.handleShowOnMap(e,card.location.lat,card.location.lng)}>Mostrar no Mapa</Button> 
                                                                    </Link>   
                                                                </div>
                                                                </Popup>
                                                                <Popup trigger={
                                                                    <Card.Link href="#profile">Ver Participantes</Card.Link>
                                                                    }
                                                                    position="right top"
                                                                    modal
                                                                    nested
                                                                >
                                                                <Participants cardId={card.id} />
                                                                </Popup>
                                                            </Card.Text>
                                                        </Card.Body>
                                                        </Card>
                                                        </Col>
                                                    )
                                                } 
                                            })}
                                    </Row>
                                </Tab>
                                {
                                    isUser &&

                                    <Tab eventKey="getsMine " title="Ajudas/Eventos inscritos">
                                        <Row xs={1} md={2}>
                                            {this.state.mine.map((me,index) => {
                                                if(!me.isEvent){  
                                                    return( 
                                                    <Col>
                                                    <Card border="danger" style={{ width: '21rem' , height:'10rem' , margin:'1rem'}}>
                                                        <Card.Body>
                                                        <Card.Title><b>{me.name}</b></Card.Title>
                                                            <Card.Text fontsize="1.2rem">
                                                                <p>Descrição:{me.description}</p>
                                                                <Popup trigger={
                                                                    <Card.Link href="#profile">Mais info</Card.Link>
                                                                    }
                                                                    position="right top"
                                                                    modal
                                                                    nested
                                                                >
                                                                {/**falta por resto e botoes com handles! */}
                                                                <div>
                                                                    <p><u>Descrição:</u> {me.description}</p>
                                                                    <p><u>Data:</u> {dateFormat(me.time,"default")}</p>
                                                                    <p><u>Id:</u> {me.id}</p>
                                                                    <Button id={me.id} variant="outline-danger" size="sm" onClick={this.handleLeaveHelp}>Deixar Ajuda</Button>
                                                                    <Link to="/maps">
                                                                        <Button value={me.location.lat, me.location.lng} variant="outline-info" size="sm"
                                                                        onClick={(e) => this.handleShowOnMap(e,me.location.lat,me.location.lng)}>Mostrar no Mapa</Button> 
                                                                    </Link>          
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
                                                        <Card.Title><b>{me.name}</b></Card.Title>
                                                            <Card.Text fontsize="1.2rem">
                                                                <p>Descrição: {me.description}</p>
                                                                <Popup trigger={
                                                                    <Card.Link href="#profile">Mais info</Card.Link>
                                                                    } 
                                                                    position="right top"
                                                                    modal
                                                                    nested
                                                                >
                                                                {/**falta por resto e botoes com handles! */}
                                                                <div>
                                                                    <p><u>Descrição:</u> {me.description}</p>
                                                                    <p><u>Data de Inicio:</u> {dateFormat(me.start,"default")}</p>
                                                                    <p><u>Data de Fim:</u> {dateFormat(me.end,"default")}</p>
                                                                    <p><u>Id:</u> {me.id}</p>
                                                                    <Button id={me.id} variant="outline-danger" size="sm" onClick={this.handleLeaveEvent}>Sair de Evento</Button>
                                                                    <Link to="/maps">
                                                                        <Button value={me.location.lat,me.location.lng} variant="outline-info" size="sm"
                                                                        onClick={(e) => this.handleShowOnMap(e,me.location.lat,me.location.lng)}>Mostrar no Mapa</Button> 
                                                                    </Link>   
                                                                </div>
                                                                
                                                                {/**botao de concluir,cancelar ajuda/evento ver o nº
                                                                de pessoas que estao inscritas no evento
                                                                botao de mostrar no mapa?*/}
                                                                </Popup>
                                                                <Popup trigger={
                                                                    <Card.Link href="#profile">Ver Participantes</Card.Link>
                                                                    }
                                                                    position="right top"
                                                                    modal
                                                                    nested
                                                                >
                                                                <Participants cardId={me.id} />
                                                                </Popup>
                                                            </Card.Text>
                                                        </Card.Body>
                                                        </Card>
                                                        </Col>
                                                    )
                                                } 
                                            })}
                                    </Row>
                                    </Tab>
                                }
                            </Tabs>
                        </Col>
                    </Row>
                </Container>   
            </Form>   
        )
    }
}
export default Profile;
