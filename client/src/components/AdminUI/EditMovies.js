import React from 'react';
import Axios from 'axios';
import EditTable from './EditTable';
import {SERVER_PATH} from '../../config/constants';

class EditMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRecived: false,
            data: []
        };
    }

    updateData = (data) => {
        this.setState({ dataRecived: true, data: data });
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
                <EditTable rows={this.state.data} />
            </div>
        );
    }


}

export default EditMovies;


