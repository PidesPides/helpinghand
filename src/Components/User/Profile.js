import React, { Component } from 'react';
import { Tab, Nav, Col, Row, Button } from 'react-bootstrap';
import ChangePassword from './ChangePassword.js';
import UpdateInfo from './UpdateInfo.js';

// por espaço entre os botoes

class Profile extends Component {
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