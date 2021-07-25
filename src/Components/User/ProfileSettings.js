import React, { Component } from 'react';
import { Tab, Nav, Col, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ChangePassword from './ChangePassword.js';
import UpdateInfo from './UpdateInfo.js';
import UpdateProfile from './UpdateProfile.js';
import UpdateEmail from './UpdateEmail.js';
import { ServicePathsLabel,PathsLabel } from '../Common/Utils/Paths.js';
import "./ProfileSetting.css";

//por aqui o handleDelete

// por espaço entre os botoes

class ProfileSettings extends Component {
    constructor(props) {
        super(props)
        this.state= {
            error: '',
            visibility:true
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    componentDidMount(){

        var urlProfileUser = ServicePathsLabel.ApiProd + ServicePathsLabel.User + "/" + sessionStorage.getItem('id') + PathsLabel.Profile +'?tokenId=' + sessionStorage.getItem('token');
        var urlProfileInst = ServicePathsLabel.ApiProd + ServicePathsLabel.Institution + "/" + sessionStorage.getItem('id') + PathsLabel.Profile +'?tokenId=' + sessionStorage.getItem('token');
        if (sessionStorage.getItem("role") === "INSTITUTION") {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            fetch(urlProfileInst,requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                visibility:data.visibility
            })).catch(
                //arrow functions<
            );
         }
         else{
              const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            fetch(urlProfileUser,requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                visibility:data.visibility
            })).catch(
                //arrow functions<
            );

         }
    }

    changeVisibility(){
        this.setState({visibility: !this.state.visibility },() =>
        this.handleVisibility());
           
    }

    async handleVisibility(e){
        var url = ServicePathsLabel.ApiProd;
        //requestoptions
        //json
        //fetch
        if (sessionStorage.getItem("role") === "INSTITUTION") {   
            const visibilityString = this.state.visibility.toString();        
            url += ServicePathsLabel.Institution + "/" + sessionStorage.getItem('id')
            + PathsLabel.Visibility+ '?visibility='+ visibilityString +'&'+ 'tokenId=' + sessionStorage.getItem('token');

            let json: Visibility = {
                visibility: this.state.visibility
            }

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            }
            console.log(this.state.visibility)
            await fetch(url,requestOptions)
            .then(data =>{
                //this.setState({visibility: this.state.visibility});
                swal("Atualização feita com sucesso.", " ","success");
            }).catch(
                    //arrow functions
            );
            

        }else{
            //MUDAR O LINK
            const visibilityString = this.state.visibility.toString(); 
            url += ServicePathsLabel.User + "/" + sessionStorage.getItem('id')
            + PathsLabel.Visibility +'?visibility='+ visibilityString + '&' + 'tokenId=' + sessionStorage.getItem('token');
            
            let json: Visibility = {
                visibility: this.state.visibility
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            }
            
            await fetch(url,requestOptions)
            .then(data =>{
                 //this.setState({visibility: this.state.visibility});
                swal("Atualização feita com sucesso.", " ","success");
            }).catch(
                    //arrow functions
            );
        }
       
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
                                    <Nav.Link eventKey="updateInfo">Conta</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="updateProfile">Perfil</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="updateEmail">E-mail</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="password">Mudar Palavra-Passe</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr></hr>
                            <h5>Visibilidade</h5>
                            <div className="switch">
                                <BootstrapSwitchButton
                                    checked={this.state.visibility}
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
                                <Tab.Pane eventKey="updateProfile">
                                    <UpdateProfile />
                                </Tab.Pane>
                                 <Tab.Pane eventKey="updateEmail">
                                    <UpdateEmail/>
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