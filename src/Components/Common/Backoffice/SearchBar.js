import React, {Component} from 'react';
import { ServicePathsLabel, Roles } from '../Utils/Paths.js';
import swal from 'sweetalert';

class SearchBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            deleteID: ""
        }

        this.updateDeleteID = this.updateDeleteID.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.delete = this.delete.bind(this);
    }

    updateDeleteID(event){
        this.setState({deleteID : event.target.value})
    }

    delete() {
        var url =  ServicePathsLabel.ApiProd + Roles.user + this.state.deleteID + '?tokenId=' + sessionStorage.getItem('token');

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        swal("Operação realizada!", "Conta foi apagada.", "success");
                        return response.text();
                    } else{
                        throw new Error(response.statusText);
                    }
                })
                .catch(
                    console.log("Erro no delete!")
                );
    }

    handleDeleteAccount(){

        swal({
            title: "Tem a certeza?",
            text: "Uma vez apagada, não é possível recuperar a conta!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Começou o processo de deleção!", {
                icon: "success",
                });

                //ask for delete
                this.delete();
            } else {
                swal("Não apagou a conta.");
            }
        }
        );

    }

render () {
    return (
    <div>
        <input type="text" onChange={this.updateDeleteID}></input>
        <button type="submit" onClick={this.handleDeleteAccount}> Apagar conta </button>
    </div>
    );
}
}
export default SearchBar;