import React, { Component } from 'react';
import Logo from "../../helpinghandBetaNoLetters.png";


class Home extends Component {
    //como ir buscar a foto a pasta do public
    render() {
        if(sessionStorage.getItem('role') === "INSTITUTION"){
            return (
                <div className="px-4 py-5 my-5 text-center">
                    <img className="d-block mx-auto mb-4" src={Logo}
                        alt="" width="300" height="213"></img>
                    <h1 className="display-5 fw-bold">Bem-vindos ao HelpingHand, Instituição {sessionStorage.getItem('id')}</h1>
                </div>
            );
        }
        if(sessionStorage.getItem('role') === "USER"){
             return (
                <div className="px-4 py-5 my-5 text-center">
                    <img className="d-block mx-auto mb-4" src={Logo}
                        alt="" width="300" height="213"></img>
                    <h1 className="display-5 fw-bold">Bem-vindos ao HelpingHand, Utilizador {sessionStorage.getItem('id')}</h1>
                </div>
            );
        }
        else{
            return (
                <div className="px-4 py-5 my-5 text-center">
                    <img className="d-block mx-auto mb-4" src={Logo}
                        alt="" width="300" height="213"></img>
                    <h1 className="display-5 fw-bold">Bem-vindos ao HelpingHand</h1>
                </div>
            );
        }       
    }
}

export default Home;
