import React,{ Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { ServicePathsLabel,PathsLabel,Roles } from '../Common/Utils/Paths.js';
import swal from 'sweetalert';

class UpdateEmail extends Component{
    constructor(props){
        super(props)
        this.state={
            newMail:''
        }
        this.onChange = this.onChange.bind(this);
        this.handleUpdateEmail=this.handleUpdateEmail.bind(this);
    }

     onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        console.log(value)
        this.setState({ ...this.state, [name]: value });
        console.log(this.state)
        e.preventDefault();
    }

    handleUpdateEmail(){
        
        var url= ServicePathsLabel.ApiProd + Roles.User + sessionStorage.getItem('id') + PathsLabel.UpdateEmail + "?tokenId=" + sessionStorage.getItem('token'); 
        //requestOptions
        let json: Email = {
            email: this.state.newMail
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        };

        
        fetch(url, requestOptions)
        .then(response => {
                if (response.ok) {
                swal("Mudança de email feita com sucesso.", " ","success");
                
            }else{
                swal("Houve um problema na atualização. Tenta outra vez","","error");
                
            }
        })
        .catch(
            //arrow functions
        );

    }
    //verificar email atual com o que existe
    render(){
        return(
            <div className="p-5">
                <Form validated>
                    <Form.Group controlId="formNewEmail">
                        <Form.Label>Novo Email</Form.Label>
                        <Form.Control type="email" name="newMail" placeholder="Introduza o email novo"
                            onChange={this.onChange} value={this.state.newMail} required />
                    </Form.Group>
                    <Button variant="primary" className="mt-2" onClick={this.handleUpdateEmail}>
                        Atualizar
                    </Button>
                </Form>
            </div>
        )
    }
}
export default UpdateEmail;