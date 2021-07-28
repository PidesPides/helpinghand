import React,{ Component } from 'react';
import { Row, Col, Container,Button } from 'react-bootstrap';
import { ServicePathsLabel, PathsLabel } from '../../Common/Utils/Paths.js';
import swal from 'sweetalert';
class Helpers extends Component{
    constructor(props){
        super(props)
        this.state = {
            helpers: []
        }
        this.handleChooseHelper = this.handleChooseHelper.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount(){
        var helpersAux = []
        var urlHelpers = ServicePathsLabel.ApiProd + PathsLabel.Help 
        + "/" + this.props.cardId + PathsLabel.Helper + '?tokenId=' + sessionStorage.getItem('token');

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        
        await fetch(urlHelpers,requestOptions)
            .then(response => response.json())
            .then(data => {
                for(var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var helper = {
                        id: obj.id,
                        email: obj.email,
                        rating: obj.rating,
                        reliability: parseFloat((obj.reliability*100)).toFixed(2) + "%"
                        
                    }
                    helpersAux.push(helper);
                }
            });
        this.setState({helpers:helpersAux});
    }

    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ ...this.state, [name]: value });
        console.log(this.state)

    }

    handleChooseHelper(e){
        var helperId = e.target.id;
        var url = ServicePathsLabel.ApiProd + PathsLabel.Help + "/" +
        this.props.cardId +PathsLabel.Helper + "?tokenId=" + sessionStorage.getItem('token') +
        '&helperId=' +helperId;
        //pedido para escolher ajudante
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url,requestOptions)
        .then(response => {
            if (response.ok) {
                swal("Ajudante adicionado com sucesso","","success");
        //mais alguma coisa'
            }else{
                swal("Este utilizador já está escolhido para te ajudar.","Escolhe outro se quiseres trocar.","error");
            }
        })

    }

    render(){
        return(
            <Container>
                <Row xs={1} md={2}>
                    {this.state.helpers.map((helper,index) => {
                        return(
                            <Row>
                                <div>
                                    <Col>
                                        <p><u>Nome:</u>{helper.id}</p>
                                        <p><u>Rating:</u>{helper.rating}</p>
                                        <p><u>Fiabilidade:</u>{helper.reliability}</p>
                                    </Col>
                                    <Col>                                    
                                        <Button id={helper.id} variant="outline-primary" size= "sm" onClick={this.handleChooseHelper}>
                                            Escolher
                                        </Button>
                                    </Col>
                                </div>
                            </Row>                    
                        )   
                    })}
               </Row>
            </Container>
        )
    }
}
export default Helpers;