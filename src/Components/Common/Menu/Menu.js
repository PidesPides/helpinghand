import { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { PathsLabel } from "../Utils/Paths";
import { MenuItem } from './MenuItem';

class Menu extends Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this);
    }
    setActiveMenuItem(id) {
        sessionStorage.setItem("activeMenuItem", id);
        this.setState({});
    }

    logout(){
        sessionStorage.clear();
        this.setState({});
        window.location.hash = "/";
    }

    loggedInMenu() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="pl-4">
                        <MenuItem id="home" href="/" label="Home" isActive={true}
                            onClick={() => this.setActiveMenuItem("home")} />

                        <MenuItem id="profile" href={PathsLabel.Profile} label="Profile" isActive={true}
                            onClick={() => this.setActiveMenuItem("profile")} />

                        <MenuItem id="maps" href={PathsLabel.Maps} label="Maps" isActive={true}
                            onClick={() => this.setActiveMenuItem("maps")} />
                    </Nav>            
                </Navbar.Collapse>
                <Nav className="ml-auto mr-4 ">
                        <MenuItem id="Logout" href="" label="Logout" onClick={this.logout}></MenuItem>
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

                        <MenuItem id="login" href={PathsLabel.Login} label="Login" isActive={false}
                            onClick={() => this.setActiveMenuItem("login")} />

                        <MenuItem id="register" href={PathsLabel.Register} label="Register" isActive={true}
                            onClick={() => this.setActiveMenuItem("register")} />
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