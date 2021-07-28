import React, {Component, Fragment} from 'react';
import { ServicePathsLabel, Roles } from '../../Utils/Paths';
import swal from 'sweetalert';

class Operations extends Component {

    constructor(props){
        super(props);

        this.state = {
            deleteID: "",
            disableID: "",
            enableID: "",
            roleID: "", newRole: "",
            infoID: ""
        }

        this.updateDeleteID = this.updateDeleteID.bind(this);
        this.updateDisableID = this.updateDisableID.bind(this);
        this.updateEnableID = this.updateEnableID.bind(this);
        this.updateRoleID = this.updateRoleID.bind(this);
        this.updateNewRole = this.updateNewRole.bind(this);
        this.updateInfoID = this.updateInfoID.bind(this);

        this.delete = this.delete.bind(this);
        this.disable = this.disable.bind(this);
        this.enable = this.enable.bind(this);
        this.role = this.role.bind(this);
        
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleDisableAccount = this.handleDisableAccount.bind(this);
        this.handleEnableAccount = this.handleEnableAccount.bind(this);
        this.handleUpdateRole = this.handleUpdateRole.bind(this);
    }

    updateDeleteID(event){
        this.setState({deleteID : event.target.value})
    }

    updateDisableID(event){
        this.setState({disableID : event.target.value})
    }

    updateEnableID(event){
        this.setState({enableID : event.target.value})
    }

    updateRoleID(event){
        this.setState({roleID : event.target.value})
    }

    updateNewRole(event) {
        this.setState({newRole: event.target.value});
    }

    updateInfoID(event) {
        this.setState({infoID : event.target.value})
    }

    delete() {
        var url =  ServicePathsLabel.ApiProd + Roles.User + this.state.deleteID + '?tokenId=' + sessionStorage.getItem('token');

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        swal("Poof! Operação realizada!", "Conta foi apagada.", "success");
                        return response.text();
                    } else{
                        swal("Erro do lado do servidor!","A operação foi abortada.", "error");
                    }
                })
                .catch(error => {
                console.log(error);
              }
        );
    }

    disable() {
        var url = ServicePathsLabel.ApiProd + Roles.User + this.state.disableID + "/status" + '?tokenId=' + sessionStorage.getItem('token')
        + '&status=false';

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        swal("Operação realizada!", "Conta foi desativada.", "success");
                        return response.text();
                    } else{
                        swal("Erro do lado do servidor!","A operação foi abortada.", "error");
                    }
                })
                .catch(error => {
                console.log(error);
              }
        );
    }

    enable() {
        var url = ServicePathsLabel.ApiProd + Roles.User + this.state.enableID + "/status" + '?tokenId=' + sessionStorage.getItem('token')
        + '&status=true';

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        swal("Operação realizada!", "Conta foi ativada.", "success");
                        return response.text();
                    } else{
                        swal("Erro do lado do servidor!","A operação foi abortada.", "error");
                    }
                })
                .catch(
                    
                );
    }

    role() {
        var url = ServicePathsLabel.ApiProd + Roles.Gbo + "updateAccountRole" +
        "?userId=" + this.state.roleID +
        "&role=" + this.state.newRole +
        "&tokenId=" + sessionStorage.getItem('token');

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        swal("Operação realizada!", "Role atualizado.", "success");
                        return response.text();
                    } else{
                        swal("Erro do lado do servidor!","A operação foi abortada.", "error");
                    }
                })
                .catch(
                    
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
                //ask for delete
                this.delete();
            } else {
                swal("Escolheu não apagar a conta.");
            }
        }
        );

    }

    handleDisableAccount(){

        swal({
            title: "Tem a certeza?",
            text: "Isto irá desativar a conta!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDisable) => {
            if (willDisable) {
                //ask for disable
                this.disable();
            } else {
                swal("Escolheu não desativar a conta.");
            }
        }
        );

    }

    handleEnableAccount(){

        swal({
            title: "Tem a certeza?",
            text: "Isto irá ativar a conta!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willEnable) => {
            if (willEnable) {
                //ask for disable
                this.enable();
            } else {
                swal("Escolheu não ativar a conta.");
            }
        }
        );

    }

    handleUpdateRole(){

        swal({
            title: "Tem a certeza?",
            text: "Isto irá influenciar as permissões e funcionalidades da conta!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willUpdateRole) => {
            if (willUpdateRole) {
                //ask for role update
                this.role();
            } else {
                swal("Escolheu não trocar o role da conta.");
            }
        }
        );

    }

render () {
    var role = sessionStorage.getItem("role");
    return (

    <div>

        <div>
            {role === "SYSADMIN" &&
                <Fragment>
                    <input type="text" onChange={this.updateRoleID}></input>
                    {'    '}
                    <select defaultValue = "null" onChange={this.updateNewRole}>
                        <option value="null"></option>
                        <option value="USER">USER</option>
                        <option value="GBO">GBO</option>
                    </select>
                    {'    '}
                    <button type="submit" onClick={this.handleUpdateRole}> Mudar role da conta </button>
                    <br/>
                    <br/>
                </Fragment>
            }
        
        </div>

        <div>
            <input type="text" onChange={this.updateDeleteID}></input>
            {'    '}
            <button type="submit" onClick={this.handleDeleteAccount}> Apagar conta </button>
            <br/>
            <br/>
            <input type="text" onChange={this.updateDisableID}></input>
            {'    '}
            <button type="submit" onClick={this.handleDisableAccount}> Desativar conta </button>
            <br/>
            <br/>
            <input type="text" onChange={this.updateEnableID}></input>
            {'    '}
            <button type="submit" onClick={this.handleEnableAccount}> Ativar conta </button>
        </div>

    </div>
    );
}
}
export default Operations;