import React, {Component} from 'react';
import { ServicePathsLabel, Roles } from '../../Utils/Paths';
import dateFormat from "dateformat";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class ListUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visib : false,
            list: [],
            profile: {}
        }

        this.showUsers = this.showUsers.bind(this);
        this.closeUsers = this.closeUsers.bind(this);
    }

    showUsers() {
        this.setState({
            visib: true
        });
    }

    closeUsers() {
        this.setState({
            visib: false
        });
    }

    convertBoolean(st) {
        if(st === true)
            return "Sim";
        else return "Não";
    }

    componentDidMount() {

        var url =  ServicePathsLabel.ApiProd + Roles.Gbo + "listRole"
        + '?role=' + "USER"
        + '&tokenId=' + sessionStorage.getItem('token');

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

    render () {
        return (
            <div>
                <button type="submit" onClick={this.showUsers}> Listar Utilizadores </button>
                <br/>
                {this.state.visib && <button type="submit" onClick={this.closeUsers}> Fechar listagem de Utilizadores </button>}
                <br/>
                <br/>
                {this.state.visib &&
                    this.state.list.map(user => (
                        <div>
                            <h3 className = "item">ID: {user.id}</h3>
                            <h3 className = "item">Data de criação: {dateFormat(user.creation,"default")}</h3>
                        
                        <Popup trigger={<button className="button"> Mais informações </button>
                                       } modal>
                            <div>
                                <h4>ID</h4>
                                <p>{user.id}</p>

                                <h4>Email</h4>
                                <p>{user.email}</p>

                                <h4>Conta ativada?</h4>
                                <p>{this.convertBoolean(user.status)}</p>

                                <h4>Perfil visível?</h4>
                                <p>{this.convertBoolean(user.visibility)}</p>
                            </div>
                        </Popup>
                        </div>
                    ))
                }
            </div>
    );
}
}

export default ListUsers;