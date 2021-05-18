import React from 'react'
import { Nav } from 'react-bootstrap';

//como fazer?
// TESTE PARA VER SE ESTA A PASSAR CHANGES

export const FooterItem = (props) =>
    <Nav.Link id={props.id} href={"#" + props.href} className={props.isActive} onClick={props.onClick}>
        {props.icon}{props.label}
    </Nav.Link>