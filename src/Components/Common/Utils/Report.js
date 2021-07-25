import React, {Component} from 'react'
import { ServicePathsLabel, Roles } from './Paths';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import swal from 'sweetalert';

class Report extends Component {

    constructor() {
        super();

        this.state = {
            subject : "",
            text : ""
        }

        this.report = this.report.bind(this);
        this.changeSubject = this.changeSubject.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    report() {
        var url =  ServicePathsLabel.ApiProd + Roles.Gbo + "createReport/" + '?tokenId=' + sessionStorage.getItem('token');
        
        let json: Login = {
            subject: this.state.subject,
            text: this.state.text
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        };

        fetch(url,requestOptions) 
        .then(response => {
            if (response.ok) {
                swal("Report enviado!", "Obrigado pela sua contribuição!", "success", {
                    button: "Fechar janela",
                });
            } else {
                swal("Erro no envio...", " ", "error");
              }
        })
        .catch(error => {
            console.log(error)
            }
        );

    }

    changeSubject (e) {
        this.setState({
            subject: e.target.value
        });
    }

    changeText (e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return(
            <Container>
                <h1> Quer dar-nos sugestões ou pretende reportar uma situação? </h1>
                <br/>
                <Row className="justify-content-md-center">
                    <Col lg="8">           
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Assunto</Form.Label>
                                <Form.Control as="textarea" onChange = {this.changeSubject}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Explicação mais detalhada</Form.Label>
                                <Form.Control as="textarea" rows={5} onChange = {this.changeText} />
                            </Form.Group>
                            <Button as="input" type="submit" value="Submeter" onClick = {this.report}/>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Report;