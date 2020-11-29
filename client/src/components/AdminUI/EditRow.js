import React from 'react';
import {updateMovie, deleteMovie} from '../../utilities/FormUtil';
import Popup from 'reactjs-popup';
import '../../utilities/Popup.css'
import MovieForm from './MovieForm';


class EditRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            display: {}
            
        };
    }
   updateState = (values) => {
       this.setState({row: {id: this.state.row.id, name:values.name, imdb_url:values.imdb_url, rating: values.rating}});
   }


    // This method makes a server update call, updates the row if successfull
    updateRow = (values) => {
        // TODO: Check for success/failure!
        updateMovie(values, this.updateState);
    }

    deleteRow = () => {
        // TODO: Check for success/failure!
        deleteMovie(this.state.row.id);
        this.setState({display: {display: "none"}});
    }

    render() {

            return (
                <tr style={this.state.display}>
                    <td>{this.state.row.name}</td>
                    <td>{this.state.row.imdb_url}</td>
                    <td>{this.state.row.rating}</td>
                    <td>
                          
                        <Popup trigger={<input type="button" className="btn btn-info" value="Edit" />} modal>
                            <MovieForm 
                            values={{id: this.state.row.id, name: this.state.row.name, imdb_url: this.state.row.imdb_url, rating: this.state.row.rating}}
                            header={<div><h2>Edit Movie</h2>
                                      <p>Please fill out this form to update "{this.state.row.name}" details</p></div>}
                            action="Update"
                            submitFunc={this.updateRow}
                            />
                        </Popup>


                    </td>
                    <td><input type="button" className="btn btn-danger" value="Delete" onClick={this.deleteRow} /></td>
                </tr>


            );
        


    }




}




export default EditRow;







