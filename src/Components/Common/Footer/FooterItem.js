import React from 'react'
import { Nav } from 'react-bootstrap';

//como fazer?
// PODE NAO SER PRECISO VER MAIS TARDE

export const FooterItem = (props) =>
    <Nav.Link id={props.id} href={"#" + props.href} className={props.isActive} onClick={props.onClick}>
        {props.icon}{props.label}
    </Nav.Link>