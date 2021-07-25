import React, {Component, Fragment} from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { ServicePathsLabel, Roles } from '../../Utils/Paths';
import dateFormat from "dateformat";
import swal from 'sweetalert';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';

class UserStats extends Component {

  constructor(props) {
        super(props);

        this.state = {
            visib : false,
            start: "",
            end: "",
            list: []
        }

    this.getStats = this.getStats.bind(this);
    this.showStats = this.showStats.bind(this);
    this.closeStats = this.closeStats.bind(this);
  }

  getStats() {

    if( (!this.state.start) || (!this.state.end) ) {
      swal("Selecione duas datas para obter um gráfico estatístico.");
      return;
    }

    var url =  ServicePathsLabel.ApiProd + Roles.Gbo + "dailyUsers" + '?tokenId=' + sessionStorage.getItem('token')
      + "&startDate=" + this.state.start + "&endDate=" + this.state.end;

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    };

    fetch(url, requestOptions)
      .then(res => res.json())
      .then(data => {
        this.setState({
          list: data
        });
      })
      .catch((error) => {
        console.error(error)
        swal("Ocorreu um erro, tente novamente.");
      });
      
  }

  showStats() {
    this.setState({
      visib: true
    });
  }

  closeStats() {
    this.setState({
      visib: false
    });
  }

  changeStart = (event) => {
    this.setState({ start: dateFormat(event.toDate(),"isoUtcDateTime") });
  }

  changeEnd = (event) => {
    this.setState({ end: dateFormat(event.toDate(),"isoUtcDateTime") });
  }

  render() {

    return (
    <Fragment>
    {this.state.visib &&
      <XYPlot margin={{bottom: 70}} xType="ordinal" width={600} height={600}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-30} />
        <YAxis />
        <VerticalBarSeries
          data={this.state.list}
        />
      </XYPlot>
    }
    
    {this.state.visib &&
      <button type="submit" onClick={this.closeStats}> Fechar estatísticas de Utilizadores </button>
    }

    <p> Data de início </p>

    <Datetime className = "office_calendar" onChange={this.changeStart}/>

    <br/>

    <p> Data de fim </p>

    <Datetime className = "office_calendar" onChange={this.changeEnd} />

    <br/>

    <button type="submit" onClick={  () => { this.getStats(); this.showStats(); } }> Submeter </button>

    </Fragment>
  );
  }
}

export default UserStats;