import React, {Component} from 'react';
import { ServicePathsLabel, Roles } from '../../Utils/Paths';
import swal from 'sweetalert';
import Popup from 'reactjs-popup';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import dateFormat from "dateformat";

class ListReports extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visib : false,
            list: [],
            message: ""
        }

        this.showReports = this.showReports.bind(this);
        this.closeReports = this.closeReports.bind(this);
        this.deleteReport = this.deleteReport.bind(this);
        this.answerReport = this.answerReport.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
    }

    showReports() {
        this.setState({
            visib: true
        });
    }

    closeReports() {
        this.setState({
            visib: false
        });
    }
    
    changeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    componentDidMount() {

        var url =  ServicePathsLabel.ApiProd + Roles.Gbo + "listReports" + "?tokenId=" + sessionStorage.getItem("token");

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch(url, requestOptions)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    list: result
                });
            })
            .catch((error) => {
                console.error(error)
            });
    }

    deleteReport(id) {
        var url = ServicePathsLabel.ApiProd + Roles.Gbo + "deleteReport" + "?tokenId=" + sessionStorage.getItem('token')
            + "&reportId=" + id;

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch(url,requestOptions) 
        .then(response => {
            if (response.ok) {
                swal("Report apagado!", "", "success");

            } else {
                swal("Não foi possível apagar este report...", "", "error");
            }
        })
        .catch(error => {
                console.log(error);
              }
        );
    }

    answerReport(id) {
        var url = ServicePathsLabel.ApiProd + Roles.Gbo + "respondReport"
            + "?tokenId=" + sessionStorage.getItem('token')
            + "&reportId=" + id;

        let json: ReportResponse = {
            message: this.state.message
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        };

        fetch(url,requestOptions)
        .then(response => {
                   if (response.ok) {
                    swal("Respondeu ao report!", "", "success");
                   } else {
                    swal(response.statusText, "", "error");
                   }
            })
        .catch(error => {
                console.log(error);
              }
        );

    }

    render () {
        return (
            <div>
                <button type="submit" onClick={this.showReports}> Listar Reports </button>
                <br/>
                {this.state.visib && <button type="submit" onClick={this.closeReports}> Fechar listagem de Reports </button>}
                <br/>
                <br/>
                {this.state.visib &&
                    this.state.list.map(report => (
                        <div className = "report_item">
                            <h3 className = "item">ID: {report.id}</h3>
                            <h3 className = "item">Enviado por: {report.creator}</h3>
                            <h3 className = "item">Data de envio: {dateFormat(report.date,"default")}</h3>
                            <button className="button" onClick = {() => this.deleteReport(report.id)}>Apagar</button>
                            <Popup trigger={<button className="button"> Abrir </button>} modal>
                                <div>
                                    <h4>ID</h4>
                                    <p>{report.id}</p>
                                    
                                    <h4>Utilizador</h4>
                                    <p>{report.creator}</p>
                                    
                                    <h4>Data de envio</h4>
                                    <p>{dateFormat(report.date,"default")}</p>
                                    <br/>
                                    <h4>Assunto</h4>
                                    <p>{report.subject}</p>
                                    
                                    <h4>Explicação</h4>
                                    <p> {report.text} </p>
                                    <br/>
                                </div>
                            </Popup>
                            <Popup trigger={<button className="button"> Responder </button>} modal>
                                <Container>
                                    <h1> Mande uma resposta para {report.creator} </h1>
                                    <br/>
                                    <Row className="justify-content-md-center">
                                        <Col lg="8">           
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                                                    <Form.Control as="textarea" rows={5} onChange = {this.changeMessage} />
                                                </Form.Group>
                                                <Button as="input" type="submit" value="Submeter"
                                                    onClick = {() => {this.answerReport(report.id)}}/>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>
                            </Popup>
                        </div>
                    ))
                }
            </div>
    );
}
}

export default ListReports;