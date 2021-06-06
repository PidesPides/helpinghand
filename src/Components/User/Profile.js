import React, { Component } from 'react';
import { Tab, Nav, Col, Row, Button } from 'react-bootstrap';
import { SweetAlert } from "react-bootstrap-sweetalert";
import ChangePassword from './ChangePassword.js';
import UpdateInfo from './UpdateInfo.js';

//por aqui o handleDelete

// por espaço entre os botoes

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state= {
            error: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    handleDelete(e){
        //por link de prod
        var url = ServicePathsLabel.ApiProd;
        //preciso de if?como ver o que ta na sessionstorage e user ou inst?
        url += ServicePathsLabel.User + this.state.username + PathsLabel.Delete;
        //por link de user
        //janela de confirmaçao
        //pedido de delete, limpar session storage e voltar a home de guest
        
        //por link de inst
        //janela de confirmaçao
        //pedido de delete, limpar session storage e voltar a home de guest
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };
                fetch(url,requestOptions).
                then(response => {
                    sessionStorage.clear();
                    this.setState({});
                    window.location.hash = "/";
                })
                .catch()
                

                
    }

    render() {
        return (
                <Tab.Container id="left-tabs-example" defaultActiveKey="updateInfo">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="updateInfo">Info</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="password">Mudar Pass</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr></hr>
                            <Button variant="danger" className="mt-2" onClick={this.handleDelete} size="lg" block>
                                Apagar Conta
                            </Button>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="updateInfo">
                                    <UpdateInfo />
                                </Tab.Pane>
                                <Tab.Pane eventKey="password">
                                    <ChangePassword />
                                </Tab.Pane>
                                
                            </Tab.Content>
                        
                        </Col>
                    </Row>
                </Tab.Container>
        )
    }
}

export default Profile;