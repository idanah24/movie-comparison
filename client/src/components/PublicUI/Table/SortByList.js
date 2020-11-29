import React from "react";


class SortByList extends React.Component {
    state = {
        sortBy: "Name"
    };
    
    sortTable = (e) => {
        this.setState({ sortBy: e.target.name });
        this.props.sortFunc(e.target.value);
    }

    render() {
        return (
            <div>
                <span>Sorted by</span><div style={{ marginLeft: "10px", marginBottom: "10px" }} className="btn-group">
                    <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.sortBy}
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" name="Name" value="name" onClick={this.sortTable}>Name</button>
                        <button className="dropdown-item" name="Rating" value="rating" onClick={this.sortTable}>Rating</button>
                        <button className="dropdown-item" name="Creation time" value="created_at" onClick={this.sortTable}>Creation time</button>
                        <button className="dropdown-item" name="Votes" value="votes" onClick={this.sortTable}>Votes</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SortByList;