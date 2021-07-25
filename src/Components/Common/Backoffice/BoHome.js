import React, {Component, Fragment} from "react";
import Table from 'react-bootstrap/Table'
import Operations from './Components/Operations.js';
import ListUsers from './Components/ListUsers.js';
import ListInstitutions from './Components/ListInstitutions.js';
import UserStats from './Components/UserStats.js';
import ListReports from './Components/ListReports.js';
import './BoHome.css';

class BoHome extends Component {

  render() {
    var role = sessionStorage.getItem("role");
    return (
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>
              <h2 className = "title"> Bem-vindo ao Back Office, {sessionStorage.getItem('id')}! </h2>
              <br />
              {<Operations />}
            </td>
          </tr>

          {role === "GBO" &&
            <Fragment>
            
              <tr>
                <td>
                    {<ListUsers className = "item" />}
                </td>
                <td>
                    {<ListInstitutions className = "item" />}
                </td>
              </tr>

              <tr>
                <td>
                    {<ListReports />}
                </td>

                <td>
                  {<UserStats/>}
                </td>
              </tr>
            </Fragment>
          }
        </tbody>
      </Table>

    );
  }
}
export default BoHome;