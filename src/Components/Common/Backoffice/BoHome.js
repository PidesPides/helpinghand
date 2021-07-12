import React, {Component} from "react";
import Table from 'react-bootstrap/Table'
import SearchBar from './SearchBar.js';
import './BoHome.css';

class BoHome extends Component {


  render() {
    return (

      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>
              <h2 className = "title"> Bem-vindo ao Back Office! </h2>
              <br />
            </td>
          </tr>

          <tr>
            <td>
                {<SearchBar />}
            </td>
          </tr>
          
        </tbody>
      </Table>

    );
  }
}
export default BoHome;