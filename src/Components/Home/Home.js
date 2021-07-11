import React, { Component } from 'react';
import Logo from "../../helpinghandBetaNoLetters.png";


class Home extends Component {
    //como ir buscar a foto a pasta do public
    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={Logo}
                    alt="" width="300" height="213"></img>
                <h1 className="display-5 fw-bold">Bem-vindos ao HelpingHand</h1>
            </div>
        );

    }
}

export default Home;
