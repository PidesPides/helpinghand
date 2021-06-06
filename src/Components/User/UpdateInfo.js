import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

//FORMS PARA USER ESTAO OK
//FALTA FORMS PARA INST, HANDLE
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

    handleUpdate() {
        const url = "url";
        fetch(url).then(
            //window.location.hash = "/";
            //guardar na sessionStorage o email 
            //arrow functions
        ).catch(
            //arrow functions
        );
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
                <Form>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control name="phone" placeholder="Introduz telefone"
                            onChange={this.onChange} value={this.state.phone} />
                    </Form.Group>

                    <Form.Group controlId="formAddr">
                        <Form.Label>Morada</Form.Label>
                        <Form.Control name="addr1" placeholder="Introduz morada"
                            onChange={this.onChange} value={this.state.addr1} />
                    </Form.Group>

                    <Form.Group controlId="formAddr2">
                        <Form.Label>Morada Alternativa</Form.Label>
                        <Form.Control name="addr2" placeholder="Introduz morada alternativa"
                            onChange={this.onChange} value={this.state.addr2} />
                    </Form.Group>

                    <Form.Group controlId="formCity">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control name="addr1" placeholder="Introduz morada"
                            onChange={this.onChange} value={this.state.city} />
                    </Form.Group>

                    <Form.Group controlId="formZip">
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control name="addr1" placeholder="Introduz morada"
                            onChange={this.onChange} value={this.state.zip} />
                    </Form.Group>

                    <Button variant="primary" onClick={this.handleUpdate}>
                        Update
                </Button>
                </Form>
            </div>


        );
    }
}

export default UpdateInfo;