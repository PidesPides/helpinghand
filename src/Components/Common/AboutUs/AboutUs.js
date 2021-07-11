import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import DI from '../../../di.jpg';
import remote from '../../../remote.jpg';
import office from '../../../office.jpg';
import './AboutUs.css';

class AboutUs extends Component {

    render() {
        return (
            <Table size ="lg">
                <tr>
                    <td>  
                        <div className="px-4 py-5 my-5 text-center">
                            <img className="di_jpg" src={DI}
                            alt="" width="740" height="300"></img>
                        </div>
                    </td>
                    <td>
                    <div className = "profile_head">
                        <h1 className = "hh_name"> Helping Hand </h1>
                        <h3 className = "pcs_name"> PogChamp Software </h3>

                        <p className = "description">
                        A equipa "PogChamp Software" é formada por alunos do Mestrado Integrado em Engenharia Informática, que se agrupou para desenvolver um projeto para a Unidade Curricular de APDC.
                        </p>
                        
                        <p className = "description">
                        Os alunos são os seguintes: André Pinto, André Simões, David Pereira, Luís Ornelas, Rodrigo Serôdio e Tiago Matias.
                        </p>

                        <p className = "description">
                        O projeto que estamos a desenvolver teve início em março de 2021, com a finalidade de oferecer uma nova plataforma de ajuda ás pessoas mais carenciadas.
                        </p>
                      </div>
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <div className = "profile_head">
                            <h3 className = "pcs_name"> Desafios... </h3>

                            <p className = "description">
                                A pandemia do novo coronavírus SARS-CoV-2, responsável pela doença Covid-19, abalou o mundo no início do ano de 2020.
                            </p>

                            <p className = "description">
                                Esta afetou imenso o nosso projeto em várias dimensões. A primeira delas é o tema, pois durante uma tragédia desta magnitude, que, entre março de 2020 e julho de 2021, causou 891 mil infeções em Portugal, torna os agentes de ajuda e caridade mais valiosos e de necessidade urgente.
                            </p>

                            <p className = "description">
                                Por outro lado, deturpou os moldes nos quais esta Unidade Curricular se tem vindo a desenrolar em anos anteriores.
                            </p>

                            <p className = "description">
                                As medidas restritivas aplicadas pelo Governo Português obrigaram o grupo a trabalhar de forma remota, predispondo um género de escritório virtual.
                            </p>
                        </div>
                    </td>
                    <td>
                        <div className="px-4 py-5 my-5 text-center">
                            <img className="remote_jpg" src={remote}
                            alt="" width="339" height="288"></img>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div className="px-4 py-5 my-5">
                            <img className="office_jpg" src={office}
                            alt="" width="528" height="352"></img>
                        </div>
                    </td>
                    <td>
                        <div className = "profile_head">
                            <h3 className = "pcs_name"> Valores e Trabalho </h3>

                            <p className = "description">
                            A nossa equipa vive um ambiente de trabalho com base nos valores da cooperação e entreajuda.
                            </p>

                            <p className = "description">
                            A compaixão que sentimos para com os afetados pela pandemia e a possibilidade de podermos viabilizar uma ferramenta que venha a ajudar milhares de pessoas carenciadas são as nossas maiores motivações.
                            </p>

                            <p className = "description">
                            Não podemos deixar de referir o profissionalismo e o interesse que temos em desenvolver competências que venham favorecer a nossa integração pessoal em ambientes empresariais.
                            </p>
                        </div>
                    </td>
                </tr>
             </Table>

        )
    }
}

export default AboutUs;