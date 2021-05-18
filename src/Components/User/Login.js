import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    handleLogin(e) {
        const url = "url";
        if (e.target.parentNode.checkValidity()) {
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

    }

    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ ...this.state, [name]: value });
        console.log(this.state)

    }
    //mudar o link para a cena final
    render() {
        return (
            <div className="p-5">
                <Form validated>
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

                    <Button variant="primary" onClick={this.handleLogin}>
                        Login
                </Button>
                </Form>


                <Link to="/register">Não estás registado? Carrega aqui.</Link>
            </div>


        );
    }
}

export default Login;
