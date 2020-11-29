import Table from './Table/Table';
import Axios from 'axios';
import React from 'react';
import {SERVER_PATH} from '../../config/constants';
class Public extends React.Component {

  state = {
    dataRecived: false,
    data: []
  }

  updateData = (newData) => {
    this.setState({ dataRecived: true, data: newData });
  }

  componentDidMount() {
    // Fetch movies from db
    Axios.get(SERVER_PATH + "/movies/get").then(response => {
      this.updateData(response.data);
    }).catch(error => {
      // Handle server error
    });
  }

  render() {
    return (
      <div className="container">
        <Table rows={this.state.data} updatePublic={this.updateData} />
      </div>
    );
  }

}

export default Public;