import React, { Component } from 'react';
import { Map , Marker,  GoogleApiWrapper } from 'google-maps-react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel } from './Paths.js';
import Popup from 'reactjs-popup';
import dateFormat from 'dateformat';
import swal from 'sweetalert';
import CreateEvent from './Popups/CreateEvent';
import CreateHelp from './Popups/CreateHelp.js';
import InfoWindowEx from './Popups/InfoWindowPopUp.js';
import legenda from '../../../legenda.png';

//por KEY
const mapStyles = {
    position: 'relative',  
    width: '100%',
    height: '91%'
};

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            showingInfoWindow: false,
            activeMarker: {},
            load: false,
            initialCenter: [{
                title: "You are here",
                name: "Current Position",
                position: {
                    //mudar isto
                    lat: 38.770116,
                    lng: -9.156341
                }
            }],
            markers: [],
            selectedPlace: {},
            distance: 0,
            existsMarkers: false
        }
        this.handleOfferHelp = this.handleOfferHelp.bind(this);
        this.handleJoinEvent = this.handleJoinEvent.bind(this);
        this.showPosition = this.showPosition.bind(this);
    }
    
    async componentDidMount() {
        var urlHelp=ServicePathsLabel.ApiProd + PathsLabel.Help + '?tokenId=' + sessionStorage.getItem('token');
        var urlEvent=ServicePathsLabel.ApiProd + PathsLabel.Event + '?tokenId=' + sessionStorage.getItem('token');
        var markersAux = [];
        const requestOptions = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }
        //chamar as apis do getEvents e getHelps
        //url do getHelp: url + ServicePathLabels.Help + token
        //fazer pedido de get
        //MUDAR
        await fetch(urlHelp,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    //addMarkers
                    var marker = {
                        creator:obj.creator,
                        description:obj.description,
                        location: {
                            lat: obj.location[0],
                            lng: obj.location[1]
                        },
                        name:obj.name,
                        time:obj.time,
                        isEvent: false,
                        id:obj.id
                    }
                    markersAux.push(marker);
                    
                }
                               
                
            });

        //url do getEvent: url + ServicePathLabels.Event + token
        //fazer pedido de get
        //MUDAR
        await fetch(urlEvent,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                var obj = data[i];
                //addMarkers e usar start e end
                var marker = {
                        creator:obj.creator,
                        description:obj.description,
                        location: {
                            lat: obj.location[0],
                            lng: obj.location[1]
                        },
                        name:obj.name,
                        start:obj.start,
                        end:obj.end,
                        isEvent: true,
                        id:obj.id
                    }
                    markersAux.push(marker);
                }
                
            });
             
        this.setState({markers: markersAux});
    }

    handleOfferHelp(e){
        var url = ServicePathsLabel.ApiProd + PathsLabel.Help + '/' + this.state.selectedPlace.id
         + PathsLabel.offerHelp + '?tokenId=' + sessionStorage.getItem('token');
        let json: Offer = {
            name : sessionStorage.getItem('id')
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        }
        fetch(url, requestOptions)
        .then(data => {
            //fazer if no swal para reload da pagina
            swal("Sucesso", "Tens de esperar que a pessoa aceite a tua ajuda.","success")
        }) 
        .catch(
            
        );
    }

    handleJoinEvent(e){        
        var url = ServicePathsLabel.ApiProd + PathsLabel.Event + '/' + this.state.selectedPlace.id
         + PathsLabel.joinEvent + '?tokenId=' + sessionStorage.getItem('token');
        let json: Offer = {
            name : sessionStorage.getItem('id')
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        }
        fetch(url, requestOptions)
        .then(data => {
            //fazer if no swal para reload da pagina
            swal("Sucesso.", " ","success")         
        }) 
        .catch(
            
        );
    }

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    showPosition(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({
            
            initialCenter: [
                {
                    title: "You are here",
                    name: "Current Position",
                    position: { lat, lng }
                }
            ]
            
        });
        this.setState({ load: true });
    }

    render() {
        console.log(this.state.markers)
        return (
            <Table size="sm">
                <Row>
                    <Col sm={2}>
                    <Popup trigger={
                        <Button variant="outline-primary" className="mt-2" size="sm">
                            Criar Pedido de Ajuda
                        </Button>} 
                        position="right top"
                        modal
                        nested
                        >
                        <CreateHelp />
                    </Popup>
                    </Col>
                    <Col sm>
                    <Popup trigger={
                        <Button variant="outline-primary" className="mt-2" size="sm">
                            Criar Evento
                        </Button>} 
                        position="right top"
                        modal
                        nested
                        >
                        <CreateEvent />
                    </Popup>
                    </Col>
                </Row>
            
                <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{
                    lat: this.state.initialCenter[0].position.lat,
                    lng: this.state.initialCenter[0].position.lng
                }}
                
                > 
                   
                    {this.state.markers.map((marker,index) => {
                        var url = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                        if(!marker.isEvent)
                            url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                        return( 
                            <Marker
                                name={marker.name}
                                creator={marker.creator}
                                description={marker.description}
                                position={marker.location}
                                time={marker.time}
                                start={marker.start}
                                end={marker.end}
                                isEvent={marker.isEvent}
                                id={marker.id}
                                icon={{
                                    url: url
                                }}
                                onClick={this.onMarkerClick}
                                
                            />
                        );
                    })}
                   

                   
                    {/*como verificar o if aqui 
                    um onclick*/}
                    <InfoWindowEx
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}>
                        <div>
                            <h5>{"Título: "+ this.state.selectedPlace.name}</h5>
                            <p>{"Criado por: " + this.state.selectedPlace.creator}</p>
                            <p>{"Descrição: " + this.state.selectedPlace.description}</p> 
                            { this.state.activeMarker.isEvent &&
                                <div>
                                    <p>{"Data de inicio: " + dateFormat(this.state.selectedPlace.start,"default")}</p>
                                    <p>{"Data de fim: " + dateFormat(this.state.selectedPlace.end,"default")}</p>
                                     <Button size="sm" variant="link" onClick={this.handleJoinEvent}>
                                        Quero juntar-me a este evento.
                                    </Button>
                                </div>
                                
                                
                            }
                            { !this.state.activeMarker.isEvent &&
                                <div>
                                    <p>{"Data: " + dateFormat(this.state.selectedPlace.time,"default")}</p>
                                    <Button  size="sm" variant="link" onClick={this.handleOfferHelp}>
                                        Quero ajudar esta pessoa.
                                    </Button>
                                </div>
                                   
                                
                            }              
                        </div>
                    </InfoWindowEx>
                    
                </Map>
                <div>
                    <img
                    src={legenda}
                    alt=""
                    style={{
                        position:'absolute',
                        left:'0px',
                        bottom:'0px'
                    }} />     
                </div>
            </Table>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCC3ZNGxhR49xDMOqDB7DT5nUi0qvcPfQo'
})(Maps);


