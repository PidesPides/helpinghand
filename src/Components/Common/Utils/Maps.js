import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

//por KEY
const mapStyles = {
    position: 'fixed',
    width: '80%',
    height: '55%',
    marginLeft: '9%',
    marginTop: '1%',
    paddingRight: '-80%'
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

    render() {
        return (
            <Map onRightclick={this.addMarker}
                google={this.props.google} zoom={12}
                style={{ mapStyles }}
                center={{
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
        );
    }




}

export default GoogleApiWrapper({
    apiKey: ''
})(Maps);
