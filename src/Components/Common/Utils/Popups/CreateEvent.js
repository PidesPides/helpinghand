import React, { Component } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel } from '../Paths';
import Datetime from 'react-datetime';
import {format} from 'date-fns';
import swal from 'sweetalert';


class CreateEvent extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            creator:'',
            description:'',
            startDate:'',   
            endDate:'',
            location:'',
            conditions:''

        }
        this.onChange = this.onChange.bind(this); 
        this.handleEvent = this.handleEvent.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);   
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
        console.log(date)
        try {
            console.log(format(date._d,"yyyy-MM-dd hh:mm:ss.SS"))
            this.setState({startDate: format(date._d,"yyyy-MM-dd hh:mm:ss.SS")}, () => 
            console.log(this.state.startDate))

        } catch (error) {
            // ...
        }
    }

    handleEndDate(date){
         try {
            console.log(format(date._d,"yyyy-MM-dd hh:mm:ss.SS"))
            this.setState({endDate: format(date._d,"yyyy-MM-dd hh:mm:ss.SS")}, () => 
            console.log(this.state.endDate))
        


        } catch (error) {
            // ...
        }
    }   
    handleEvent(e){
        var url = ServicePathsLabel.ApiProd + PathsLabel.Event;
         let json: Event = {
            name : this.state.name,
            creator : this.state.creator,
            description : this.state.description,
            start : this.state.startDate,
            end : this.state.endDate,
            location : this.state.location,
            conditions : this.state.conditions
        }
        const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
        };
        fetch(url, requestOptions)
        .then(data => {
            swal("Evento criado com sucesso.", " ","success");
            //sweet alert?
        })
        .catch(
            
        );

    }
     
    render(){

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

                            <Form.Group controlId="formCreator">
                                <Form.Label>Criador</Form.Label>
                                <Form.Control type="text" name="creator" placeholder="Introduza o nome do criador"
                                    onChange={this.onChange} value={this.state.creator} required />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" name="description"
                                    placeholder="Introduza a descrição do evento"
                                    onChange={this.onChange} value={this.state.description} required />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group controlId="formStartDate" required>
                                <Form.Label>Data de inicio</Form.Label>
                                <Datetime onClose={this.handleStartDate}
                                value={this.state.startDate}
                                timeConstraints={{
                                    hours: { min: 0, max: 23 },
                                    minutes: { min: 0, max: 59 },
                                    seconds: { min: 0, max: 59 }
                                }}
                                inputProps={{ placeholder: '', 
                                            name:'startDate'}}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEndDate">
                                <Form.Label>Data de Fim</Form.Label>
                                <Datetime onClose={this.handleEndDate}
                                value={this.state.endDate}
                                timeConstraints={{
                                    hours: { min: 0, max: 23 },
                                    minutes: { min: 0, max: 59 },
                                    seconds: { min: 0, max: 59 }
                                }} 
                                inputProps={{ placeholder: '', 
                                            name:'endDate'}}/>
                            </Form.Group>

                        </td>
                        <td>
                            <Form.Group controlId="formLocation">
                                <Form.Label>Localização</Form.Label>
                                <Form.Control type="text" name="location" placeholder="Introduza a localização"
                                    onChange={this.onChange} value={this.state.location} required />
                            </Form.Group>

                            <Form.Group controlId="formConditions">
                                <Form.Label>Condições</Form.Label>
                                <Form.Control type="text" name="conditions" placeholder="Introduza as condições"
                                    onChange={this.onChange} value={this.state.conditions} required />
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
