import { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';


//fazer so o pedido de delete?
//tem o handle Delete?
class Delete extends Component{
    constructor(props) {
        super(props)
        this.state= {
            error: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    handleDelete(e){
        var url = '';
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                };
                fetch(url,requestOptions).
                then()

                
    }

    render(){
        <div>
           
        </div>
    }
}

export default Delete;
