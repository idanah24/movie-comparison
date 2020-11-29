import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as formUtils from '../../utilities/FormUtil';


class MovieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rangeValue: this.props.values.rating };
    }
    

    changeRange = (e) => {
        this.setState({ rangeValue: e.target.value });
    }

    submitForm = (values) => {
        values.rating = this.state.rangeValue;
        this.props.submitFunc(values);
    }

    render() {
        return (

            <div className="container">
                <div className="col-md-6 mx-auto">

                    <div className="card card-body bg-light mt-5">

                        {this.props.header}

                        <Formik 
                        initialValues={{ id: this.props.values.id,
                         name: this.props.values.name,
                          imdb_url: this.props.values.imdb_url,
                        rating: this.props.values.rating }}
                         onSubmit={this.submitForm}
                          validate={formUtils.validate}>
                            <Form>

                                <div className="form-group">
                                    <label htmlFor="name">Name: <sup>*</sup></label>
                                    <Field type="text" id="name" name="name" className="form-control form-control-lg" />
                                    <ErrorMessage name="name" component="span" className="invalid-feedback" style={{ display: "block" }} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="imdb_url">IMDB Page URL: <sup>*</sup></label>
                                    <Field type="text" id="imdb_url" name="imdb_url" className="form-control form-control-lg" />
                                    <ErrorMessage name="imdb_url" component="span" className="invalid-feedback" style={{ display: "block" }} />
                                </div>

                                <div className="form-group">
                                    <div className="slidecontainer">
                                        <label htmlFor="rating">Rating:  </label>
                                        <span id="f" style={{ color: "blue" }}>{this.state.rangeValue}</span><br />
                                        <Field type="range" id="rating" name="rating" min="1" max="10" value={this.state.rangeValue} onChange={this.changeRange} className="slider" />
                                        
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <input type="submit" value={this.props.action} className="btn btn-success btn-block" />
                                    </div>
                                    <Field type="text" id="id" name="id" value={this.props.values.id} style={{display: "none"}}/>

                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>

        );
    }
}

export default MovieForm;