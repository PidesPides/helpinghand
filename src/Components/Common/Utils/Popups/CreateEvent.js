import React, { Component } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel } from '../Paths';
import DateTimePicker from 'react-datetime-picker';
import Geocode from "react-geocode";
import dateFormat from "dateformat";
import swal from 'sweetalert';
import "./CreateEvent.css";



class CreateEvent extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            creator:'',
            description:'',
            startDate:new Date(),   
            endDate:new Date(),
            locationName:'',
            locationLL:[]

        }
        this.onChange = this.onChange.bind(this); 
        this.handleEvent = this.handleEvent.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        //this.convertLocation = this.convertLocation.bind(this);   
    }

    onChange(e) {
        const target = e.target;
        console.log(target)
        const value = target.value;
        const name = target.name;
        console.log(value)
        this.setState({ ...this.state, [name]: value});
        console.log(this.state)
        e.preventDefault();
    }

    handleStartDate(date){
        try{
            var formatD =dateFormat(date,"isoUtcDateTime"); 
            this.setState({startDate: formatD}, () => 
            console.log(this.state.startDate))
        } catch(error){
            // ...
        }
           
    }

    handleEndDate(date){
         try {
       var formatD =dateFormat(date,"isoUtcDateTime"); 
            this.setState({endDate: formatD}, () => 
            console.log(this.state.endDate))
        } catch (error) {
            // ...
        }
    }   
    
    handleEvent(e){
        var locationTmp = [];
        Geocode.setApiKey("AIzaSyDMR13Yod6yvWuy3UydPwCCVxI2FBLvshA");
        Geocode.setRegion("pt");
        Geocode.fromAddress(this.state.locationName).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                locationTmp.push(lat);
                locationTmp.push(lng);
                this.setState({locationLL: locationTmp});
                var url = ServicePathsLabel.ApiProd + PathsLabel.Event + '?tokenId=' + sessionStorage.getItem('token');
                let json: Event = {
                    name : this.state.name,
                    //creator : this.state.creator,
                    description : this.state.description,
                    start : this.state.startDate,
                    end : this.state.endDate,
                    location : locationTmp
                }
                const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(json)
                };
                fetch(url, requestOptions)
                .then(data => {
                    //fazer if no swal para reload da pagina
                    swal("Evento criado com sucesso.", " ","success")
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
     
    render(){
        let d1 = new Date(this.state.startDate);
        let d2 = new Date(this.state.endDate); 
        return(
            <Form>
                <Table size ="lg">
                    <tr>
                        <td>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="name" name="name" placeholder="Introduza o nome do evento"
                                onChange={this.onChange} value={this.state.name} required />
                            </Form.Group>

                        </td>
                        <td>
                            <Form.Group controlId="formStartDate" required>
                                <Form.Label>Data de inicio</Form.Label>
                                    <DateTimePicker
                                        calendarType="ISO 8601"
                                        name="startDate"
                                        format="y-MM-dd h:mm:ss a"
                                        disableClock= {true}
                                        onChange={this.handleStartDate}
                                        value={d1}
                                    />
                            </Form.Group>

                            <Form.Group controlId="formEndDate">
                                <Form.Label>Data de Fim</Form.Label>
                                    <DateTimePicker
                                        calendarType="ISO 8601"
                                        name="endDate"
                                        format="y-MM-dd h:mm:ss a"
                                        disableClock= {true}
                                        onChange={this.handleEndDate}
                                        value={d2}
                                        
                                    />
                            </Form.Group>
                        </td>
                        <td>
                        <Form.Group controlId="formDescription">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" name="description"
                                    placeholder="Introduza a descrição do evento"
                                    onChange={this.onChange} value={this.state.description} required />
                            </Form.Group>

                            <Form.Group controlId="formLocation">
                                <Form.Label>Localização</Form.Label>
                                <Form.Control type="text" name="locationName" placeholder="Introduza a localização"
                                    onChange={this.onChange} value={this.state.locationName} required />
                            </Form.Group>
                        </td>
                    </tr>
                </Table>       
                <Button variant="primary" className="mt-2" onClick={this.handleEvent}>
                    Criar
                </Button>
            </Form>
        )
    }
}

export default CreateEvent;

/*


*/
