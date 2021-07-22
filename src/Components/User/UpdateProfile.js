import React,{Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel } from '../Common/Utils/Paths.js';
import swal from 'sweetalert';
class UpdateProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            bio:'',
            visibility: false,
            initials:'',
            categories:[]  
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleUpdate(){
        //url MUDAR OS LINKS
        var url=ServicePathsLabel.ApiProd;
         if (sessionStorage.getItem("role") === "INSTITUTION") {    
            url += ServicePathsLabel.Institution + "/" + sessionStorage.getItem('id')
            + PathsLabel.Profile + '?tokenId=' + sessionStorage.getItem('token');

            let json: Profile ={
                //por variaveis extra
                name: this.state.name,
                bio: this.state.bio,
                initials:this.state.initials,
                categories:this.state.categories

            }
            //requestOptions
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            }

            //fetch
            fetch(url,requestOptions)
                    .then(data =>{
                        swal("Atualização feita com sucesso.", " ","success");
                    }).catch(
                        //arrow functions
                    );
        }
        else{

            url += ServicePathsLabel.User + "/" + sessionStorage.getItem('id')
            + PathsLabel.Profile + '?tokenId=' + sessionStorage.getItem('token');

            let json: Profile ={
                name: this.state.name,
                bio: this.state.bio
            }
            //requestOptions
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            }

            //fetch
            fetch(url,requestOptions)
                    .then(data =>{
                        swal("Atualização feita com sucesso.", " ","success");
                    }).catch(
                        //arrow functions
                    );
        }
    }

     onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ ...this.state, [name]: value });
        console.log(this.state)

    }

    render(){
        return(
            <div className="p-5">
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="name" type="name" placeholder="Introduz o nome"
                            onChange={this.onChange} value={this.state.name}/>
                    </Form.Group>

                    <Form.Group controlId="formBio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control name="bio" type="bio" placeholder="Fala-nos sobre ti" 
                            onChange={this.onChange} as="textarea" rows={3} value={this.state.bio}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" className="mt-2" onClick={this.handleUpdate}>
                    Atualizar
                </Button>
    	    </div>
            
        );
    }

}
export default UpdateProfile;