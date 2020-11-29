import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast notifications
export const notify = (message, type) => {
    if (type === "success") {
        toast.success(message, { position: toast.POSITION.TOP_CENTER });
    }
    else {
        toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }

}




// Regular expression to validate given url
export function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


// Defining field validations
export const validate = values => {
    let errors = {};

    if (!values.name) {
        errors.name = "Movie name is required";
    }

    if (!values.imdb_url) {
        errors.imdb_url = "URL is required"
    }
    else if (!validURL(values.imdb_url)) {
        errors.imdb_url = "Invalid URL";
    }

    return errors;
}

export const addMovie = values => {

    toast.configure();

    // Collecting data
    const data = { name: values.name, imdb_url: values.imdb_url, rating: values.rating };

    // Posting to server
    Axios.post("/movies/create", data).then(response => {
        // Handle server response
        notify("We got it!\nMovie added successfully.", "success");
    }).catch(error => {
        // Handle failure
        if (error.response && error.response.status === 400) {
            // Movie exists
            notify("Sorry, movie name already exists.", "fail");
        }
        else if (!error.response) {
            notify("Cannot send request", "fail");
        }
    });

};

export const updateMovie = (values, updateState) => {

    toast.configure();
    // Collecting data
    const data = { name: values.name, imdb_url: values.imdb_url, rating: values.rating };

    console.log(data);
    // Posting to server
    Axios.put("/movies/update/" + values.id, data).then(response => {
        // Handle server response
        if(response.status === 200){
            updateState(data);
            notify("Movie updated successfully!", "success");
        }
        
    }).catch(error => {
        // Handle failure
        if (error.response && error.response.status === 400) {
            // Movie exists
            notify("Sorry, movie name already exists.", "fail");
        }
        else if(error.response){
            notify("Response code is: " + error.response.status, "fail");
        }
        else{
            console.log(error);
        }
    });
}

export const deleteMovie = (id) => {
    toast.configure();
    Axios.delete("/movies/delete/" + id).then(response => {
        if(response.status === 200){

            notify("Movie deleted", "success");

        }
    }).catch(error => {
        console.log(error);
    });
}
