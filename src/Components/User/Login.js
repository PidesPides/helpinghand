import React, { Component } from 'react';
import { Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ServicePathsLabel ,PathsLabel} from '../Common/Utils/Paths.js';
import swal from 'sweetalert';

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
        var url = ServicePathsLabel.ApiProd; 
        if (e.target.parentNode.checkValidity()) {
            if(!this.state.isInstitution){
                url += ServicePathsLabel.User + "/" +this.state.username + PathsLabel.Login;
                let json: Login = {
                    id: this.state.username,
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
                        return response.json();

                    }else{
                        swal("Password ou username errado. Tenta outra vez","Já verificaste o teu email?","error");
                    }
                })
                .then(json => {
                    
                    sessionStorage.setItem('token', json.token);
                    sessionStorage.setItem('id',this.state.username);
                    sessionStorage.setItem('role',json.role)
                    window.location.hash = "/";
                    window.location.reload();
                
                })
                .catch(error => {
                    console.log(error)    
                    return;
                }
                );
            }
            
        }
        else {
            swal("Por favor preencha todos os campos.", "error");
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
        return (
            <div className="p-5">
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

            </div>

        );
    }
}




export default Login;
