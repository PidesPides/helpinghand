import React, {Component} from 'react';
import { ServicePathsLabel, Roles } from '../../Utils/Paths';
import dateFormat from "dateformat";

class ListInstitutions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visib : false,
            list: []
        }

        this.showInstitutions = this.showInstitutions.bind(this);
        this.closeInstitutions = this.closeInstitutions.bind(this);
    }

    showInstitutions() {
        this.setState({
            visib: true
        });
    }

    closeInstitutions() {
        this.setState({
            visib: false
        });
    }

    componentDidMount() {

        var url =  ServicePathsLabel.ApiProd + Roles.Gbo + "listRole"
        + '?role=' + "INSTITUTION"
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
                    //handle your errors here
                    console.error(error)
            });
    }

    render () {
        return (
            <div>
                <button type="submit" onClick={this.showInstitutions}> Listar Instituições </button>
                <br/>
                {this.state.visib && <button type="submit" onClick={this.closeInstitutions}> Fechar listagem de Instituições </button>}
                <br/>
                <br/>
                {this.state.visib &&
                    this.state.list.map(inst => (
                        <div>
                            <h3 className = "item">ID: {inst.id}</h3>
                            <h3 className = "item">Criado a: {dateFormat(inst.creation,"default")}</h3>
                        </div>
                    ))
                }
            </div>
    );
}
}

export default ListInstitutions;