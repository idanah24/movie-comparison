import React from 'react';
import Popup from 'reactjs-popup';
import '../../utilities/Popup.css'
import MovieForm from './MovieForm';
import {addMovie} from '../../utilities/FormUtil';

class Admin extends React.Component {

  
  render() {
    return (
      <div className="container my-5">

        <div className="row">

          <div className="col">

            <Popup trigger={<input type="button" value="Add a Movie" className="btn btn-success btn-block" />} modal>
                            <MovieForm 
                            values={{name: "", imdb_url: "", rating: 5}}
                            header={<div><h2>Add a new movie</h2>
                                      <p>Hello, Admin! Please fill out this form to add a new movie</p></div>}
                            action={"Add"}
                            submitFunc={addMovie}
                            />
                        </Popup>
          </div>


          <div className="col">
            <a href="/admin/editMovies"><input type="button" value="Edit Movies" className="btn btn-success btn-block" /></a>
          </div>

        </div>

      </div>
    );
  }
}

export default Admin;
