import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import {SERVER_PATH} from '../../config/constants';

const onSubmit = (values) => {
    const data = {name: values.name, password: values.password};
    Axios.post(SERVER_PATH + '/users/login', data)
      .then(response => {
        console.log(response.data);
    });

}

const validate = values => {
    let errors = {};

    if (!values.name) {
        errors.name = "Name is required";
    }

    if (!values.password) {
        errors.password = "Password is required"
    }


    return errors;
}



class Login extends React.Component {


    state = { name: "", password: "" };



    render() {
        return (



            <div className="container">
                <div className="col-md-6 mx-auto">

                    <div className="card card-body bg-light mt-5">

                        <Formik
                            initialValues={{
                                name: this.state.name,
                                password: this.state.password
                            }}

                            onSubmit={onSubmit}
                            validate={validate}>
                            <Form>
                            <div><h2>Sign in</h2>
                                      <p>Login system not ready yet</p></div>

                                <div className="form-group">
                                    <label htmlFor="name">Name: <sup>*</sup></label>
                                    <Field type="text" id="name" name="name" className="form-control form-control-lg" />
                                    <ErrorMessage name="name" component="span" className="invalid-feedback" style={{ display: "block" }} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="imdb_url">Password: <sup>*</sup></label>
                                    <Field type="password" id="password" name="password" className="form-control form-control-lg" />
                                    <ErrorMessage name="password" component="span" className="invalid-feedback" style={{ display: "block" }} />
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <input type="submit" value="Login" className="btn btn-success btn-block" />
                                    </div>
                                </div>
                            </Form>
                        </Formik>

                    </div>

                </div >
            </div >

        );
    }

}

export default Login;











