import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ServicePathsLabel ,PathsLabel} from '../Common/Utils/Paths.js';
import swal from 'sweetalert';

//FORMS PARA USER ESTAO OK
//FALTA FORMS PARA INST,
class UpdateInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            addr1: '',
            addr2: '',
            city: '',
            zip: ''
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleUpdate(e) {
        var url =ServicePathsLabel.ApiProd;
        if (sessionStorage.getItem("role") === "INSTITUTION") {    
            url += ServicePathsLabel.Institution + "/" + sessionStorage.getItem('id')
            + PathsLabel.UpdateInfo + '?tokenId=' + sessionStorage.getItem('token');
                let json: Institution = {
                    phone: this.state.phone,
                    address1: this.state.addr1,
                    address2: this.state.addr2,
                    zipcode: this.state.zip,
                    city: this.state.city
                }
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                }
                fetch(url,requestOptions)
                .then(data =>{
                    swal("Atualização feita com sucesso.", " ","success");
                }).catch(
                    //arrow functions
                );
            }
        
        else{
            url += ServicePathsLabel.User + "/" + sessionStorage.getItem('id')
            + PathsLabel.UpdateInfo + '?tokenId=' + sessionStorage.getItem('token');
            let json: User = {
                phone: this.state.phone,
                address1: this.state.addr1,
                address2: this.state.addr2,
                zipcode: this.state.zip,
                city: this.state.city
            }

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            }
            fetch(url,requestOptions)
            .then(data => {
                swal("Atualização feita com sucesso.", " ","success");
            }).catch(
                //arrow functions
            );
                
        }
               
    }

    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ ...this.state, [name]: value });
        console.log(this.state)

    }
    
    //bio
    //lista de instiuiçoes?

    render() {
        return (
            <div className="p-5">
                        <Form validated>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control name="phone" placeholder="Introduz o telefone"
                                    onChange={this.onChange} value={this.state.phone} required/>
                            </Form.Group>

                            <Form.Group controlId="formAddr">
                                <Form.Label>Morada</Form.Label>
                                <Form.Control name="addr1" placeholder="Introduz a morada"
                                    onChange={this.onChange} value={this.state.addr} required/>
                            </Form.Group>

                            <Form.Group controlId="formAddr2">
                                <Form.Label>Morada Alternativa</Form.Label>
                                <Form.Control name="addr2" placeholder="Introduz uma morada alternativa"
                                    onChange={this.onChange} value={this.state.addr2} required/>
                            </Form.Group>

                            <Form.Group controlId="formCity">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control name="city" placeholder="Introduz a localidade"
                                    onChange={this.onChange} value={this.state.city} required/>
                            </Form.Group>

                            <Form.Group controlId="formZip">
                                <Form.Label>Código Postal</Form.Label>
                                <Form.Control type="zipcode" name="zip" placeholder="Introduz o código postal"
                                    onChange={this.onChange} value={this.state.zip} required/>
                            </Form.Group>
                        </Form>

                         <Button variant="primary" className="mt-2" onClick={this.handleUpdate}>
                        Atualizar
                        </Button>
                    </div>
        );
    }
}

export default UpdateInfo;