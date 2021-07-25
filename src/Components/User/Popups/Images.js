import React,{ Component } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { ServicePathsLabel,PathsLabel,Roles } from '../../Common/Utils/Paths.js';
import swal from 'sweetalert';
class Images extends Component{

    constructor(props){
        super(props)
        this.state={
            avatar:''  
        }
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    }

    handleChangeAvatar(e){
        const avatarId = e.target.id;
        var url = ServicePathsLabel.ApiProd + Roles.User + sessionStorage.getItem('id') 
        + PathsLabel.Avatar + "?avatar=" + avatarId + "&tokenId=" + sessionStorage.getItem('token');
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'}
        }
        //fazer o fetch com url da foto
        fetch(url,requestOptions)
        .then(data =>{
            swal("Atualização feita com sucesso.", " ","success")
            .then(() => {
                window.location.reload();
            });
        }).catch(
                //arrow functions
        );
    }

    //form check?
    render(){
        return(
            <Row className="m-3 p-3">
                <Col>
                    <Image src="https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/avatar_0.png" />
                    <Button id="0" variant="outline-primary" className="mt-2" size= "sm" onClick={this.handleChangeAvatar}>
                        Escolher
                    </Button>
                </Col>
                <Col >
                    <Image src="https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/avatar_1.png" />
                        <Button id="1" variant="outline-primary" className="mt-2" size= "sm" onClick={this.handleChangeAvatar}>
                        Escolher
                    </Button>
                </Col>
                <Col>
                    <Image src="https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/avatar_2.png" />
                    <Button id="2" variant="outline-primary" className="mt-2" size= "sm" onClick={this.handleChangeAvatar}>
                        Escolher
                    </Button>
                </Col>
                <Col>
                    <Image src="https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/avatar_3.png" />
                    <Button id="3" variant="outline-primary" className="mt-2" size= "sm" onClick={this.handleChangeAvatar}>
                        Escolher
                    </Button>
                </Col>
                <Col>
                    <Image src="https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/avatar_4.png" />
                    <Button id="4" variant="outline-primary" className="mt-2" size= "sm" onClick={this.handleChangeAvatar}>
                        Escolher
                    </Button>
                </Col>

                <Col>
                    <Image src="https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/avatar_5.png" />
                    <Button id="5" variant="outline-primary" className="mt-2" size= "sm" onClick={this.handleChangeAvatar}>
                        Escolher
                    </Button>
                </Col>
                <Col>
                    <Image src="https://storage.googleapis.com/thehelpinghand.appspot.com/avatars/avatar_6.png" />
                    <Button id="6" variant="outline-primary" className="mt-2" size= "sm" onClick={this.handleChangeAvatar}>
                        Escolher
                    </Button>
                </Col>
            </Row>
        );
    }
}
export default Images;