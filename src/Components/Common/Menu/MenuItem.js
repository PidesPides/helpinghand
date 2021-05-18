import React from 'react'
import { Nav } from 'react-bootstrap';

export const MenuItem = (props) =>
    <Nav.Link id={props.id} href={"#" + props.href} className={props.isActive} onClick={props.onClick}>
        {props.icon}{props.label}
    </Nav.Link>
