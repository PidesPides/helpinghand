import React, { Component } from 'react';
import Logo from "C:/Users/a_men/helpinghand/src/3746_small.jpg";

//por foto da equipa?
//msg sobre objetivo do grupo?
//fotos de todos?
class AboutUs extends Component {

    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={Logo}
                    alt="" width="400" height="400"></img>
                <h1 className="display-5 fw-bold">Em construção</h1>
            </div>
        )
    }
}

export default AboutUs;