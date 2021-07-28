import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ServicePathsLabel , PathsLabel } from '../Common/Utils/Paths.js';
import swal from "sweetalert";

const passPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$';
//passes iguais OK, regex esta OK e form vazio OK
//vai ser preciso confirmar que oldPass e igual a pass que esta neste user!!!
//preciso de ter um changepassword para inst?

// FAZER VERIFICAÇAO DE LOGIN SABER SE PODES ESTAR NUM ECRA
class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            newPass2: '',
            isPassCorrect: true
        }
        this.handleChangePass = this.handleChangePass.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    handleChangePass(e) {
        var url = ServicePathsLabel.ApiProd;
        //if (!this.state.password || !this.state.password2 || !matchPass)
            //meter alert e return
        
        if (sessionStorage.getItem("role") === "INSTITUTION") {
            url += ServicePathsLabel.Institution + "/" + sessionStorage.getItem('id') + PathsLabel.ChangePassword + '?tokenId=' + sessionStorage.getItem('token');
            console.log(e.target.parentNode.checkValidity())
            if (e.target.parentNode.checkValidity()) {
                let json: Password = {
                    oldPassword: this.state.oldPass,
                    newPassword:this.state.newPass,
                    confirmation:this.state.newPass2   
                }
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };                   
                fetch(url, requestOptions)
                .then(response => {
                     if (response.ok) {
                        swal("Mudança de password feita com sucesso.", " ","success");
                        //return response.json();
                    }else{
                        swal("As passwords estão diferentes. Tenta outra vez","","error");
                        //this.setState({error: response.statusText});
                        //throw new Error(response.statusText);
                    //}
                    }
                })
                .catch(
                    //arrow functions
                );
                
            }
            else {
                swal("Por favor preencha todos os campos corretamente.","", "error");
            }
        } 
        if(sessionStorage.getItem("role") === "USER"){
            url += ServicePathsLabel.User + "/" + sessionStorage.getItem('id') + PathsLabel.ChangePassword + '?tokenId=' + sessionStorage.getItem('token');
            if (e.target.parentNode.checkValidity()) {
                let json: Password = {
                    oldPassword: this.state.oldPass,
                    newPassword:this.state.newPass,
                    confirmation:this.state.newPass2
                }
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(json)
                };
                fetch(url, requestOptions)
                .then(response => {
                     if (response.ok) {
                        swal("Mudança de password feita com sucesso.", " ","success");
                        //return response.json();
                    }else{
                        swal("As passwords estão diferentes. Tenta outra vez","","error");
                        //this.setState({error: response.statusText});
                        //throw new Error(response.statusText);
                    //}
                    }
                })
                .catch(
                    //arrow functions
                );
            }
            else {
                swal("Por favor preencha todos os campos corretamente.","", "error");
            }

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

                    <Button variant="primary" className="mt-2" onClick={this.handleChangePass}>
                        Atualizar
                    </Button>
                </Form>
            
            </div>
        )

    }
}

export default ChangePassword;