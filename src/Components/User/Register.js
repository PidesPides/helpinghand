import React, { Component } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel } from '../Common/Utils/Paths.js';
import swal from 'sweetalert';

const passPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?/="])[a-zA-Z0-9!@#$%^&*?/="]{8,20}$';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //user
            username: '',
            email: '',
            password: '',
            password2: '',
            //institution
            institutionName: '',
            institutionUsername: '',
            institutionInitials: '',
            institutionEmail: '',
            isInstitution: false,
            isPassCorrect: true
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    handleRegister(e) {
        var url = ServicePathsLabel.ApiProd;
        if (this.state.isInstitution) {
            url += ServicePathsLabel.Institution;
            if (e.target.parentNode.checkValidity()) {
                let json: Institution = {
                    id: this.state.institutionUsername,
                    name: this.state.institutionName,
                    initials: this.state.institutionInitials,  
                    email: this.state.institutionEmail,
                    password: this.state.password,
                    confirmation:this.state.password2
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };                   
                fetch(url, requestOptions)
                .then(data => {
                    swal("Registo feito com sucesso.", " ","success")
                    .then(() => {
                        window.location.hash = PathsLabel.Login;
                    });
                })
                .catch(
                    
                );
                
            }
            else {
                //alert("Por favor preencha todos os campos.")
                swal("Por favor preencha todos os campos.", " ", "warning");
            }
        }
        else {
            url += ServicePathsLabel.User;
            if (e.target.parentNode.checkValidity()) {
                let json: User = {
                    id: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    confirmation: this.state.password2
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };
                fetch(url, requestOptions)
                .then(data => {
                    swal("Registo feito com sucesso.", " ","success")
                    .then(() => {
                        window.location.hash = PathsLabel.Login;
                    });
                })
                .catch(

                );
            }
            else {
                swal("Por favor preencha todos os campos.", " ", "warning");
            }

        }

        e.preventDefault();
    }

    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const isPassCorrect = target.checkValidity() || value === '';
        console.log(value)
        this.setState({ ...this.state, [name]: value, isPassCorrect: isPassCorrect });
        console.log(this.state)
        e.preventDefault();
    }

    onSelect(eventKey) {
        var isInstitution = true;
        if (eventKey === '1') {
            isInstitution = false;
        }
        this.setState({ isInstitution: isInstitution });

    }

    render() {
        const isInstitution = this.state.isInstitution;
        const isPassCorrect = this.state.isPassCorrect;
        var dropdownTitle = 'Utilizador';
        if (isInstitution) {
            dropdownTitle = 'Institui????o';
        }
        var matchPass = this.state.password === this.state.password2;
        if (!this.state.password || !this.state.password2)
            matchPass = true;
        return (
            <div className="p-5">
                <p>Que tipo de utilizador ???</p>
                <DropdownButton id="dropdown-basic-button" variant='info' title={dropdownTitle} >
                    <Dropdown.Item eventKey='1' active={!isInstitution} onSelect={() => this.onSelect('1')}>Utilizador</Dropdown.Item>
                    <Dropdown.Item eventKey='2' active={isInstitution} onSelect={() => this.onSelect('2')}>Institui????o</Dropdown.Item>
                </DropdownButton>
                <hr></hr>
                {!isInstitution &&
                    <Form validated>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" name="username" placeholder="Introduza o username"
                                onChange={this.onChange} value={this.state.username} required />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Introduza o email"
                                onChange={this.onChange} value={this.state.email} required />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password"
                                placeholder="Introduza a password entre 8-20 caracteres"
                                onChange={this.onChange} value={this.state.password} pattern={passPattern}
                                required />
                        </Form.Group>
                        {!isPassCorrect &&
                            <div className="text-danger">
                                <p>A password deve ter entre 8 a 20 caracteres e no minimo um simbolo,
                                    um n??mero, uma letra min??scula e uma letra mai??scula.</p>
                            </div>
                        }

                        <Form.Group controlId="formRetypePassword">
                            <Form.Label>Confirmar Password</Form.Label>
                            <Form.Control type="password" name="password2" placeholder="Reintroduza a password"
                                onChange={this.onChange} value={this.state.password2}
                                required />
                            {!matchPass &&
                                <div className="text-danger">
                                    <p>A password est?? diferente.</p>
                                </div>
                            }
                        </Form.Group>

                        <Button variant="primary" className="mt-2" onClick={this.handleRegister}>
                            Registar
                        </Button>
                    </Form>
                }

                {isInstitution &&
                    <div>
                        <Form validated>
                            <Form.Group controlId="formInstitutionName">
                                <Form.Label>Nome da institui????o</Form.Label>
                                <Form.Control type="name" name="institutionName" placeholder="Introduza o nome da institui????o"
                                    onChange={this.onChange} value={this.state.institutionName} required />
                            </Form.Group>

                            <Form.Group controlId="formInstitutionUsername">
                                <Form.Label>Username da institui????o</Form.Label>
                                <Form.Control type="username" name="institutionUsername" placeholder="Introduza o username da institui????o"
                                    onChange={this.onChange} value={this.state.institutionUsername} required />
                            </Form.Group>

                            <Form.Group controlId="formInstitutionInitials">
                                <Form.Label>Sigla da institui????o</Form.Label>
                                <Form.Control type="username" name="institutionInitials" placeholder="Introduza a sigla da institui????o"
                                    onChange={this.onChange} value={this.state.institutionInitials} required />
                            </Form.Group>

                            <Form.Group controlId="formInstitutionEmail">
                                <Form.Label>Email da institui????o</Form.Label>
                                <Form.Control type="email" name="institutionEmail" placeholder="Introduza o email da institui????o"
                                    onChange={this.onChange} value={this.state.institutionEmail} required />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password"
                                    placeholder="Introduza a password entre 8-20 caracteres"
                                    onChange={this.onChange} value={this.state.password} pattern={passPattern}
                                    required />
                            </Form.Group>
                            {!isPassCorrect &&
                                <div className="text-danger">
                                    <p>A password deve ter entre 8 a 20 caracteres e no minimo um simbolo,
                                    um n??mero, uma letra min??scula e uma letra mai??scula.</p>
                                </div>
                            }

                            <Form.Group controlId="formRetypePassword">
                                <Form.Label>Confirmar Password</Form.Label>
                                <Form.Control type="password" name="password2" placeholder="Reintroduza a password"
                                    onChange={this.onChange} value={this.state.password2}
                                    required />
                                {!matchPass &&
                                    <div className="text-danger">
                                        <p>A password est?? diferente.</p>
                                    </div>
                                }
                            </Form.Group>
                            
                            <Button variant="primary" className="mt-2" onClick={this.handleRegister}>
                                Registar
                            </Button>
                        </Form>
                    </div>
                }
            </div>
        );
    }

}
export default Register;