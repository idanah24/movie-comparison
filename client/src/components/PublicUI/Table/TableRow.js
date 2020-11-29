import LikeCell from './LikeCell';
import React from 'react';

class TableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { votes: parseInt(this.props.row.votes) };
        console.log(this.props.row);
    }

    

    addVote = () => {
        this.setState((prev) => {
            return { votes: prev.votes + 1 };
        });
    }

    render() {
        return (
            <tr>
                {/* Movie title cell */}
                <td>
                    <span className="lead">
                        <h1><span className="badge badge-info" style={{ maxWidth: "100%" }}>{this.props.row.name}</span></h1>
                    </span>
                    <p className="text-justify">
                        {new Date(this.props.row.created_at).toDateString()}
                    </p>
                </td>

                {/* Our rating cell */}
                <td>
                    <p className="text-justify">
                        Our rating:<br></br>{this.props.row.rating}
                    </p>
                </td>

                {/* Number of votes & like button cell */}
                <td>
                    <p className="text-justify">{this.state.votes}<br></br>people like<br></br>{this.props.row.name}</p>
                    <LikeCell data={this.props.row} updateVote={this.addVote} />
                </td>

                {/* IMDB Url cell */}
                <td>

                    <h1><a href={"//" + this.props.row.imdb_url} target="_blank" rel="noreferrer" className="badge badge-success">Visit IMDB Page</a></h1>

                </td>
            </tr>

        );
    }

}

export default TableRow;