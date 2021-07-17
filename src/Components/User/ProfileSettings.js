import React, { Component } from 'react';
import { Tab, Nav, Col, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ChangePassword from './ChangePassword.js';
import UpdateInfo from './UpdateInfo.js';
import { ServicePathsLabel} from '../Common/Utils/Paths.js';
import "./ProfileSetting.css";

//por aqui o handleDelete

// por espaço entre os botoes

class ProfileSettings extends Component {
    constructor(props) {
        super(props)
        this.state= {
            error: '',
            isPublic:true
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    changeVisibility(e){
        this.setState({isPublic: !this.state.isPublic})
    }

    handleDelete(e){
        //por link de prod
        var url = ServicePathsLabel.ApiProd;
        
        if(sessionStorage.getItem("role") === "INSTITUTION"){
            url += ServicePathsLabel.Institution+ "/" + sessionStorage.getItem('id') +  '?tokenId=' + sessionStorage.getItem('token');;
            const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json'}
                    
                };                     
                swal({
                    title: "Tem a certeza que quer apagar a conta?",
                    text: "Se for apagada ela vai ficar desativada e terá de entrar em contacto connosco para a reactivar!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("A sua conta foi apagada com sucesso", {
                        icon: "success",
                        });
                        fetch(url,requestOptions)
                        .then(response => {
                            if(!response.ok)
                                throw new Error(response.statusText);
                            sessionStorage.clear();
                            window.location.hash = "/";
                            window.location.reload();
                        })
                        .catch(error =>{
                            swal("Houve um problema a apagar a sua conta.", " ", "error");
                        })    
                    } 
                }); 
        }
        
        if(sessionStorage.getItem("role") === "USER"){
            url += ServicePathsLabel.User + "/" + sessionStorage.getItem('id') + '?tokenId=' + sessionStorage.getItem('token');
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            };
            swal({
                    title: "Tem a certeza que quer apagar a conta?",
                    text: "Se for apagada ela não pode ser recuperada!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
            .then((willDelete) => {
                if (willDelete) {
                    swal("A sua conta foi apagada com sucesso", {
                    icon: "success",
                    });
                    fetch(url,requestOptions)
                    .then(response => {
                        if(!response.ok)
                            throw new Error(response.statusText);
                        sessionStorage.clear();
                        window.location.hash = "/";
                        window.location.reload();
                    })
                    .catch(error =>{
                        swal("Houve um problema a apagar a sua conta.", " ", "error");
                    })    
                } 
            });
        }
    }

    render() {
        return (
                <Tab.Container id="profileSettingsMenu" defaultActiveKey="updateInfo" PullRight >
                    <Row>
                        <Col sm={2} >
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="updateInfo">Info</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="password">Mudar Pass</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr></hr>
                            <h5>Visibilidade</h5>
                            <div className="switch">
                                <BootstrapSwitchButton
                                    checked={this.state.isPublic}
                                    onlabel='Público'
                                    offlabel='Privado'
                                    onChange={this.changeVisibility}
                                    width={100}
                                    size='sm'
                                />
                            </div>
                            <hr></hr>
                            <Button variant="danger" className="mt-2" onClick={this.handleDelete} size="sm" block>
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

export default ProfileSettings;