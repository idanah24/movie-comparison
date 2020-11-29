import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Axios from 'axios';
class LikeCell extends React.Component {

    // This method handles server call for voting
    vote = () => {
        // Sucess
        this.setState({ status: this.options.loading });
        Axios.put("/movies/vote/" + this.props.data.id).then(response => {

            // Handle response

            // Updating votes shown
            this.props.updateVote();
            // Updating to check icon
            this.setState({status: this.options.success});


        }).catch(error => {
            // Handle error
        });

    }

    // Status options in process
    options = {
        like: <button type="button" className="btn btn-default btn-lg" onClick={this.vote}>
            <FontAwesomeIcon icon={faThumbsUp} size="2x" />
        </button>,

        loading: <FontAwesomeIcon icon={faSpinner} size="3x" />,

        success: <FontAwesomeIcon icon={faCheck} size="3x" color="green" />
    }

    // Initial like button
    state = { status: this.options.like };

    render() {
        return (
            <div>
                {this.state.status}
            </div>
        );
    }


}

export default LikeCell;



