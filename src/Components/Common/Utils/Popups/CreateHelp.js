import React, { Component } from 'react';
import { Form,Table, Button } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel } from '../Paths.js';
import DateTimePicker from 'react-datetime-picker';
import dateFormat from "dateformat";
import Geocode from "react-geocode";
import swal from 'sweetalert';

//o is Permanent e uma checkbox!
class CreateHelp extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            description:'',
            dateH:new Date(),
            locationName:'',
            locationLL:[]
        }
        this.onChange = this.onChange.bind(this);
        this.handleHelp = this.handleHelp.bind(this);
        //this.convertLocation = this.convertLocation.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }
    

    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(value)
        this.setState({ ...this.state, [name]: value});
        console.log(this.state)
        e.preventDefault();
    }
    
    handleDate(date){
         try {
            var formatD =dateFormat(date,"isoUtcDateTime"); 
            this.setState({dateH: formatD}, () => 
            console.log(this.state.dateH))
        


        } catch (error) {
            // ...
        }
    }  

    handleHelp(e){
        var locationTmp = [];
        Geocode.setApiKey("AIzaSyDMR13Yod6yvWuy3UydPwCCVxI2FBLvshA");
        Geocode.setRegion("pt");
        Geocode.fromAddress(this.state.locationName).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                locationTmp.push(lat);
                locationTmp.push(lng);
                this.setState({locationLL: locationTmp});
                var url = ServicePathsLabel.ApiProd + PathsLabel.Help + '?tokenId=' + sessionStorage.getItem('token');
                let json: Help = {
                    name: this.state.name,
                    //creator: sessionStorage.getItem('id'),
                    description: this.state.description,
                    time: this.state.dateH,
                    location: locationTmp
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };
                fetch(url, requestOptions)
                .then(data => {
                    //fazer if no swal para reload da pagina
                    swal("Ajuda criada com sucesso.", " ","success")
                    .then(() => {
                        window.location.reload();
                    });
                    
                })
                .catch(
                    
                );
            },
            (error) => {
                console.error(error);
            }
            ); 
        

    }
    //funcoes e pedido
    //e um POST

    //POR DATA
    render(){
        let d = new Date(this.state.dateH);
        return( 
            <Form>
                <Table size ="sm">
                    <tr>
                        <td>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="name" name="name" placeholder="Introduza o nome do evento"
                                onChange={this.onChange} value={this.state.name} required />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="description" name="description"
                                placeholder="Introduza a descrição do evento"
                                onChange={this.onChange} value={this.state.description} required />
                        </Form.Group>
                        </td>
                        <td>
                        <Form.Group controlId="formDate">
                            <Form.Label>Data de Pedido</Form.Label>
                                <DateTimePicker
                                    calendarType="ISO 8601"
                                    name="dateH"
                                    format="y-MM-dd h:mm:ss a"
                                    disableClock= {true}
                                    onChange={this.handleDate}
                                    value={d}
                                />
                        </Form.Group>
                        </td>
                        <td>
                        <Form.Group controlId="formLocation">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control type="location" name="locationName" placeholder="Introduza a localização"
                            onChange={this.onChange} value={this.state.locationName} required />
                        </Form.Group>
                        </td>
                    </tr>
                </Table>

                <Button variant="primary" className="mt-2" onClick={this.handleHelp}>
                    Criar
                </Button>
            </Form>

        )
    }
}

export default CreateHelp;