import React, { Component } from 'react';
import { Form, Button,Dropdown,DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { ServicePathsLabel } from '../Common/Utils/Paths.js';


//espaço entre os campos e o botao

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isInstitution: false,
            error: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }


    handleLogin(e) {
        //posso por types(UserLogin?)
        //se mandam as cenas em string => usar o return response.text()!!!!
        var url = ServicePathsLabel.ApiProd; 
        if (e.target.parentNode.checkValidity()) {
            if(!this.state.isInstitution){
                url += ServicePathsLabel.User + this.state.username + ServicePathsLabel.Login;
                let json: Login = {
                    clientId: this.state.username,
                    password: this.state.password
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };
                fetch(url,requestOptions) 
                .then(response => {
                   if (response.ok) {
                        return response.text();
                    }else{
                        this.setState({error: response.statusText});
                        throw new Error(response.statusText);
                    }
                })
                .then(token => {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('id',this.state.username);
                    window.location.hash = "/";
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error)    
                    return;
                }
                );

            }
            else{
                url += ServicePathsLabel.Institution + this.state.username + ServicePathsLabel.Login;
                let json: Login = {
                    clientId: this.state.username,
                    password: this.state.password
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };
                fetch(url,requestOptions) 
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }else{
                        this.setState({error: response.statusText});
                        throw new Error(response.statusText);
                    }
                })
                .then(token => {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('id',this.state.username);
                    window.location.hash = "/";
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error)    
                    return;
                });
            }
            
        }
        else {
            alert("Por favor preencha todos os campos.")
        }

    }

    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ ...this.state, [name]: value });
        console.log(this.state)

    }

    onSelect(eventKey) {
        var isInstitution = true;
        if (eventKey === '1') {
            isInstitution = false;
        }
        this.setState({ isInstitution: isInstitution });

    }

    hideAlert(){
        this.setState({error: ''});
    }

    //mudar o link para a cena final
    render() {
        const isInstitution = this.state.isInstitution;
        var dropdownTitle = 'Utilizador';
        if (isInstitution) {
            dropdownTitle = 'Instituição';
        }
        return (
            <div className="p-5">
                <p>Que tipo de utilizador é?</p>
                <DropdownButton id="dropdown-basic-button" variant='info' title={dropdownTitle} >
                    <Dropdown.Item eventKey='1' active={!isInstitution} onSelect={() => this.onSelect('1')}>Utilizador</Dropdown.Item>
                    <Dropdown.Item eventKey='2' active={isInstitution} onSelect={() => this.onSelect('2')}>Instituição</Dropdown.Item>
                </DropdownButton>
                <hr></hr>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" placeholder="Introduz username"
                            onChange={this.onChange} value={this.state.username} required />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Introduz password"
                            onChange={this.onChange} value={this.state.password} required />
                    </Form.Group>
                    
                    <Button variant="primary" className="mt-2" onClick={this.handleLogin}>
                        Login
                    </Button>

                </Form>


                <Link to="/register">Não estás registado? Carrega aqui.</Link>

                {this.state.error !== '' && /*alerts*/
                    <SweetAlert danger title={this.state.error} onConfirm={this.hideAlert}>
    
                    </SweetAlert>
                }
            </div>


        );
    }
}

export default Login;
