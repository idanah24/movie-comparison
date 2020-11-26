import {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Axios from 'axios';


// Regular expression to validate given url
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }



//   Defining initial form values
const initialValues = {
    name: "",
    imdb_url: "",
};

// Defining field validations
const validate = values => {
    let errors = {};

    if(!values.name){
        errors.name = "Movie name is required";
    }

    if(!values.imdb_url){
        errors.imdb_url = "URL is required"
    }
    else if(!validURL(values.imdb_url)){
        errors.imdb_url = "Invalid URL";
    }

    return errors;
}

function AddMovieForm() {
    // Define hook for range slider
    const [range, setRange] = useState(5);

    // Defining action upon valid submission
    const onSubmit = values => {
        // Collecting data
        const data = {name: values.name, imdb_url: values.imdb_url, rating: range};

        // Posting to server
        Axios.post("http://localhost:80/movie-comparison/server/movies/create", data).then(response => {
            // Handle server response
            
            console.log(response);

        }).catch(error => {
            // Handle failure
            console.log(error.response);
        });

    };

    return (

        <div className="container">
        <div className="col-md-6 mx-auto">

        <div className="card card-body bg-light mt-5">

            <h2>Add a new movie</h2>
            <p>Hello, Admin! Please fill out this form to add a new movie</p>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
            <Form>
                
                <div className="form-group">
                    <label htmlFor="name">Name: <sup>*</sup></label>
                    <Field type="text" id="name" name="name" className="form-control form-control-lg" />
                    <ErrorMessage name="name" component="span" className="invalid-feedback" style={{display: "block"}}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="imdb_url">IMDB Page URL: <sup>*</sup></label>
                    <Field type="text" id="imdb_url" name="imdb_url" className="form-control form-control-lg" />
                    <ErrorMessage name="imdb_url" component="span" className="invalid-feedback" style={{display: "block"}}/>
                </div>

                {/* <RangeBar /> */}

                <div className="form-group">
                    <div className="slidecontainer">
                        <label htmlFor="rating">Rating:  </label>
                        <span id="f" style={{color: "blue"}}>{range}</span><br/>
                        <input type="range" id="rating" min="1" max="10" value={range} onChange={event => setRange(event.target.value)} className="slider" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <input type="submit" value="Add" className="btn btn-success btn-block" />
                    </div>
                  
                </div>
            </Form>
            </Formik>
        </div>
    </div>
</div>

  );
}

export default AddMovieForm;