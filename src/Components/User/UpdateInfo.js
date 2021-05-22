import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

//morada com separadores?rua/codigo postal/cidade
class UpdateInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            password2: '',
            age: '',
            adress: ''
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
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Introduz email"
                            onChange={this.onChange} value={this.state.email} />
                    </Form.Group>

                    <Form.Group controlId="formIdade">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control type="age" name="age" placeholder="Introduz idade"
                            onChange={this.onChange} value={this.state.age} />
                    </Form.Group>

                    <Form.Group controlId="formMorada">
                        <Form.Label>Morada</Form.Label>
                        <Form.Control type="address" name="address" placeholder="Introduz morada"
                            onChange={this.onChange} value={this.state.address} />
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