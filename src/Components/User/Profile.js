//imports
import React,{Component} from 'react';
import {Table,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ServicePathsLabel,PathsLabel } from '../Common/Utils/Paths.js';
import Avatar from 'react-avatar';

class Profile extends Component{

    constructor(props){
        super(props)
        this.state={
            username:'',
            phone:'',
            addr1:'',
            addr2:'',
            city:'',
            zip:''
        }
        this.onChange = this.onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value });
    console.log(this.state)
    }

    //pedido de get
    //ISTO TEM DE SER UM COMPONENTDIDMOUNT
    componentDidMount(){
        //url para o profile
        var url =ServicePathsLabel.ApiProd;
        //NAO E PRECISO diferenciar entre user e instituiçao    
        url += ServicePathsLabel.User + "/" + sessionStorage.getItem('id')
        + PathsLabel.UpdateInfo + '?tokenId=' + sessionStorage.getItem('token');
        //fazer requestsOptions    
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        
        //fazer fetch
        fetch(url,requestOptions)
        .then(response => response.json())
        .then(data => this.setState({
            phone: data.phone,
            addr1: data.address1,
            addr2: data.address2,
            zip: data.zipcode,
            city: data.city
        })).catch(
            //arrow functions
        );
    
    }
       
    //ver layout no paint
    //tabela com 2 rows
    //1º row - 2 linhas
    //2ºrow - tabela
    //fazer form com readonly
    render(){
        return(
            <Form>
                <Table size="lg">
                    <td>
                        <tr>
                            <td>
                                <Avatar githubHandle="PidesPides" size="200" round={true} />
                            </td>
                            <td>
                                <tr>
                                <Form.Group controlId="formUsername">
                                    <Form.Label ><u>Username</u></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={sessionStorage.getItem('id')} />
                                </Form.Group>

                                <Form.Group controlId="formPhone">
                                    <Form.Label ><u>Telefone</u></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={this.state.phone} />
                                </Form.Group>    
                                </tr>
                            </td>
                            <td>
                                <tr>
                                   <Form.Group controlId="formAddr1">
                                    <Form.Label ><u>Morada</u></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={this.state.addr1} />
                                </Form.Group>

                                <Form.Group controlId="formAddr2">
                                    <Form.Label ><u>Morada alternativa</u></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={this.state.addr2} />
                                </Form.Group>
                                </tr>
                            </td>
                            <td>
                                <tr>
                                <Form.Group controlId="formCity">
                                    <Form.Label ><u>Cidade</u></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={this.state.city} />
                                </Form.Group>
                                
                                <Form.Group controlId="formZip">
                                    <Form.Label ><u>Código Postal</u></Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={this.state.zip} />
                                </Form.Group>

                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/profilesettings">Definições de Conta</Link>
                            </td>
                        </tr>
                    </td>
                </Table>
            </Form>   
        )
    }

}
export default Profile;