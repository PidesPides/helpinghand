import { Component } from "react";
import { Nav, Navbar } from 'react-bootstrap';

class Footer extends Component {



    render() {
        return (
            <Navbar sticky="bottom" bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="#aboutus">Sobre nós</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Footer;




