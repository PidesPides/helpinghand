import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

const passPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$';
//passes iguais OK, regex esta OK e form vazio OK
//vai ser preciso confirmar que oldPass e igual a pass que esta neste user!!!
class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            newPass2: '',
            isPassCorrect: true
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    handleUpdate(e) {
        if (e.target.parentNode.checkValidity()) {
            const url = "url";
            fetch(url).then(
                //window.location.hash = "/";
                //guardar na sessionStorage o email 
                //arrow functions
            ).catch(
                //arrow functions
            );
        }
        else {
            alert("Por favor preencha todos os campos.")
        }
        e.preventDefault();
    }

    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const isPassCorrect = target.checkValidity() || value === '';
        this.setState({ ...this.state, [name]: value, isPassCorrect: isPassCorrect });
        console.log(this.state)
        e.preventDefault();

    }

    render() {
        const isPassCorrect = this.state.isPassCorrect;
        var matchPass = this.state.newPass === this.state.newPass2;
        if (!this.state.newPass || !this.state.newPass2)
            matchPass = true;
        return (

            <div className="p-5">
                <Form validated>
                    <Form.Group controlId="formOldPassword">
                        <Form.Label>Antiga Password</Form.Label>
                        <Form.Control type="password" name="oldPass" placeholder="Introduz password antiga"
                            onChange={this.onChange} value={this.state.oldPass} required />
                    </Form.Group>

                    <Form.Group controlId="formNewPassword">
                        <Form.Label>Nova Password</Form.Label>
                        <Form.Control type="password" name="newPass" placeholder="Introduz password nova"
                            onChange={this.onChange} value={this.state.newPass} pattern={passPattern}
                            required />
                    </Form.Group>
                    {!isPassCorrect &&
                        <div className="text-danger">
                            <p>A password deve ter entre 8 a 20 caracteres e no minimo um simbolo,
                                    um número, uma letra minúscula e uma letra maiúscula.</p>
                        </div>
                    }

                    <Form.Group controlId="formRetypePassword">
                        <Form.Label>Reintroduz Password</Form.Label>
                        <Form.Control type="password" name="newPass2" placeholder="Reintroduz a password nova"
                            onChange={this.onChange} value={this.state.newPass2}
                            required />
                        {!matchPass &&
                            <div className="text-danger">
                                <p>A password está diferente.</p>
                            </div>
                        }
                    </Form.Group>


                    <Button variant="primary" onClick={this.handleUpdate}>
                        Atualizar
                    </Button>
                </Form>


            </div>
        )

    }
}

export default ChangePassword;