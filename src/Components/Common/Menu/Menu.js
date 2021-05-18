import { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { PathsLabel } from "../Utils/Paths";
import { MenuItem } from './MenuItem';

class Menu extends Component {
    setActiveMenuItem(id) {
        sessionStorage.setItem("activeMenuItem", id);
        this.setState({});
    }

    loggedInMenu() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="pl-4">
                        <MenuItem id="home" href="/" label="Home" isActive={true}
                            onClick={() => this.setActiveMenuItem("home")} />

                        <MenuItem id="updateinfo" href={PathsLabel.UpdateInfo} label="UpdateInfo" isActive={true}
                            onClick={() => this.setActiveMenuItem("updateinfo")} />

                        <MenuItem id="maps" href={PathsLabel.Maps} label="Map" isActive={true}
                            onClick={() => this.setActiveMenuItem("maps")} />
                    </Nav>
                    {
                        <Nav className="ml-auto mr-4">
                            <MenuItem id="Logout" href="" label="Logout" onClick={this.logout}></MenuItem>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
    //tirar updateinfo e maps
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

                        <MenuItem id="profile" href={PathsLabel.Profile} label="Profile" isActive={true}
                            onClick={() => this.setActiveMenuItem("profile")} />

                        <MenuItem id="maps" href={PathsLabel.Maps} label="Maps" isActive={true}
                            onClick={() => this.setActiveMenuItem("maps")} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    render() {
        const isLoggedIn = sessionStorage.getItem("email") !== null;
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