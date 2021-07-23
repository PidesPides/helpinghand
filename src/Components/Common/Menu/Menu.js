import React,{ Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { PathsLabel } from "../Utils/Paths";
import { MenuItem } from './MenuItem';

//tratar da roda dentada
class Menu extends Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this);
    }
    setActiveMenuItem(id) {
        sessionStorage.setItem("activeMenuItem", id);
        this.setState({});
    }
    //fazer sweetalert de logout
    logout(){
        sessionStorage.clear();
        this.setState({});
        window.location.hash = "/";
    }

    loggedInMenu() {
        var isGbo = false;
        if(sessionStorage.getItem("role") === "GBO")
            isGbo = true;


        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="pl-4">
                        <MenuItem id="home" href="/" label="Home" isActive={true}
                            onClick={() => this.setActiveMenuItem("home")} />

                        <MenuItem id="profile" href={PathsLabel.Profile} label="Perfil" isActive={true}
                            onClick={() => this.setActiveMenuItem("profile")} />

                        <MenuItem id="maps" href={PathsLabel.Maps} label="Mapa de Ajudas" isActive={true}
                            onClick={() => this.setActiveMenuItem("maps")} />
                        {
                            !isGbo &&
                            <MenuItem id="feed" href={PathsLabel.Feed} label="Notificações"
                            isActive={true} onClick={() => this.setActiveMenuItem("feed")} /> 

                        }
                        <MenuItem id="aboutus" href={PathsLabel.AboutUs} label="Sobre Nós"
                            isActive={true} onClick={() => this.setActiveMenuItem("aboutus")} />

                        <MenuItem id="report" href={PathsLabel.Report} label="Reportar"
                            isActive={true} onClick={() => this.setActiveMenuItem("reportar")} />
                        { isGbo &&
                            <MenuItem id="backoffice" href={PathsLabel.BackOffice} label="BackOffice"
                            isActive={true} onClick={() => this.setActiveMenuItem("backoffice")} />    
                        }
                    </Nav>            
                </Navbar.Collapse>

                <Nav className="ml-auto mr-4 ">
                        <MenuItem id="Logout" href="" label="Terminar Sessão" onClick={this.logout}></MenuItem>
                    </Nav>
            </Navbar>
        );
    }

    guestMenu() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="pl-4">
                        <MenuItem id="home" href="/" label="Home" isActive={true}
                            onClick={() => this.setActiveMenuItem("home")} />

                        <MenuItem id="register" href={PathsLabel.Register} label="Registar" isActive={true}
                            onClick={() => this.setActiveMenuItem("register")} />

                        <MenuItem id="login" href={PathsLabel.Login} label="Iniciar Sessão" isActive={false}
                            onClick={() => this.setActiveMenuItem("login")} />
                        <MenuItem id="aboutus" href={PathsLabel.AboutUs} label="Sobre Nós"
                            isActive={true} onClick={() => this.setActiveMenuItem("aboutus")} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    //POR ISTO QUANDO TESTES ESTIVEREM A FUNCIONAR
    //sessionStorage.getItem("email") !== null;
    render() {
        //false => menu guest(sem registo);
        //true  => menu loggedIn(com registo e logIn feito)
        const isLoggedIn = sessionStorage.getItem("id") !== null;;
        return (
            <div>
                { isLoggedIn &&
                    this.loggedInMenu()
                }

                { !isLoggedIn &&
                    this.guestMenu()
                }
            </div>
        );
    }
}

export default Menu;