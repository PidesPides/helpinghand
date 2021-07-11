import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import {Table, Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { ServicePathsLabel,PathsLabel } from './Paths.js';
import CreateEvent from './Popups/CreateEvent';
import CreateHelp from './Popups/CreateHelp';

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

        this.addMarker = this.addMarker.bind(this);
        this.showPosition = this.showPosition.bind(this);
    }

    componentDidMount() {
    
    //FALTA TOKEN
    var urlHelp=ServicePathsLabel.ApiProd + PathsLabel.Help;
    var urlEvent=ServicePathsLabel.ApiProd + PathsLabel.Event;

    const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
    //chamar as apis do getEvents e getHelps
    //url do getHelp: url + ServicePathLabels.Help + token
    //fazer pedido de get
    //MUDAR
    fetch(urlHelp,requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ 

        }));

    //url do getEvent: url + ServicePathLabels.Event + token
    //fazer pedido de get
    //MUDAR
    fetch(urlEvent,requestOptions)
        .then(response => response.json())
        .then(data => this.setState({

        }));

    //markers vao ser preenchidos com o que vem dos gets
    }

    addMarker(t, map, coord) {

        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState(previousState => {
            return {
                markers: [
                    ...previousState.markers,
                    {
                        position: { lat, lng }
                    }
                ]
            };
        });
    }

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
    //MUDAR O TAMANHO DOS POPUPS
    render() {
        return (
            <Table size ="sm">
                <tr>
                    <td>
                    <Popup trigger={
                        <Button variant="outline-primary" className="mt-2" size="sm">
                            Criar Pedido de Ajuda
                        </Button>} 
                        position="right top"
                        modal>
                        <CreateHelp />
                    </Popup>
  
                    <Popup trigger={
                        <Button variant="outline-primary" className="mt-2" size="sm">
                            Criar Evento
                        </Button>} 
                        position="right top"
                        modal>
                        <CreateEvent />
                    </Popup>
                    </td>
                </tr>

                <Map
                    google={this.props.google} zoom={12}
                    style={mapStyles}
                    initialCenter={{
                        lat: this.state.initialCenter[0].position.lat,
                        lng: this.state.initialCenter[0].position.lng
                    }}>
                    {this.state.markers.map((marker, index) => (
                        <Marker draggable={true}
                            onClick={this.onMarkerClick}
                            title={index + 1}
                            name={index + 1}
                            key={index}
                            position={marker.position}
                        />
                    ))}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>

                </Map>
            </Table>
        );
    }




}

export default GoogleApiWrapper({
    apiKey: ''
})(Maps);
//AIzaSyCC3ZNGxhR49xDMOqDB7DT5nUi0qvcPfQo//