import React, { Component } from 'react';
import { Form,Table, Button } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel } from '../Paths.js';
import swal from 'sweetalert';

//o is Permanent e uma checkbox!
class CreateHelp extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            creator:'',
            description:'',
            isPermanent:false,
            location:'',
            conditions:''
        }
        this.onChange = this.onChange.bind(this);
        this.changePermanent = this.changePermanent.bind(this);
        this.handleHelp = this.handleHelp.bind(this);
    }
    //confirmar se e assim que se faz
    changePermanent(e){
        this.setState({isPermanent: !this.state.isPermanent})
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

    handleHelp(e){
        var url = ServicePathsLabel.ApiProd + PathsLabel.Help;

         let json: Help = {
            name: this.state.name,
            creator: this.state.creator,
            description: this.state.description,
            permanent: this.state.isPermanent,
            location: this.state.location,
            conditions: this.state.conditions
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        };
        fetch(url, requestOptions)
        .then(data => {
            swal("Ajuda criada com sucesso.", " ","success");
            //sweet alert?
            
        })
        .catch(
            
        );

    }
    //funcoes e pedido
    //e um POST

    //o isPermanent pode ser uma checkbox no final!!!!
    render(){
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

                        <Form.Group controlId="formCreator">
                            <Form.Label>Criador</Form.Label>
                            <Form.Control type="creator" name="creator" placeholder="Introduza o nome do criador"
                                onChange={this.onChange} value={this.state.creator} required />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="description" name="description"
                                placeholder="Introduza a descrição do evento"
                                onChange={this.onChange} value={this.state.description} required />
                        </Form.Group>
                        </td>
                        <td>
                        <Form.Group controlId="formLocation">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control type="location" name="location" placeholder="Introduza a localização"
                            onChange={this.onChange} value={this.state.location} required />
                        </Form.Group>

                        <Form.Group controlId="formConditions">
                            <Form.Label>Condições</Form.Label>
                            <Form.Control type="conditions" name="conditions" placeholder="Introduza as condições"
                                onChange={this.onChange} value={this.state.conditions} required />
                        </Form.Group>
                        </td>
                    </tr>
                </Table>

                <Form.Group controlId="formIsPermanentCheckbox">
                    <Form.Check type="checkbox" name ="permanent" label="Ajuda Permanente"
                     value={this.state.isPermanent} onChange={this.changePermanent} />
                </Form.Group>
                    
                <Button variant="primary" className="mt-2" onClick={this.handleHelp}>
                    Criar
                </Button>
            </Form>

        )
    }
}

export default CreateHelp;