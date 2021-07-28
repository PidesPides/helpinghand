import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';



class EmailVerification extends Component{
constructor(props){
    super(props)
    this.state={
        confirmation:''
    }
    this.handleVerification = this.handleVerification.bind(this);
}
async componentDidMount(){
    var url = window.location.href;
    var base64request = url.split("?request=")[1];
    let base64ToString = Buffer.from(base64request, "base64").toString();
 
    await this.handleVerification(base64ToString);
}

//funcao que faz handle do pedido?
handleVerification(string){
    var url= string;
    let json : test ={

    }
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    }

    fetch(url,requestOptions)
    .then(response =>{
     if (response.ok) {
         
        swal("Verificação feita com sucesso.","","success")
        .then((willRedirect) => {
            if(willRedirect) {
                window.location.href= "https://thehelpinghand.ew.r.appspot.com/#/login";
            }
        }
        );
     }
     else{
        swal("Houve um problema com a verificação.","","error")
        .then((willRedirect) => {
            if(willRedirect) {
                window.location.href= "https://thehelpinghand.ew.r.appspot.com/#/";
            }
        }
        );
    }})



}


render(){
    return(
        <h5>A VERIFICAR EMAIL...</h5>
    )
}
}
export default EmailVerification;