import TableRow from "./TableRow";
import SortByList from './SortByList';
import React from 'react';


class Table extends React.Component {


    sort = (sortBy) => {
        let newRows = [...this.props.rows];

        newRows.sort(function(a, b) {
            return a[sortBy]-b[sortBy];
        });

        // If rows are already sorted in this order
        if(JSON.stringify(this.props.rows) === JSON.stringify(newRows)){
            newRows.reverse();
        }
        // Update sorted rows
        this.props.updatePublic(newRows);
    }

    render() {
        return (
            <div className="table-responsive">

                <SortByList sortFunc={this.sort}/>

                <table className="table table table-hover table-responsive">

                    <tbody>

                        {this.props.rows.map((row) => (<TableRow row={row} key={row.id}/>))}

                    </tbody>

                </table>
            </div>
            );
    }

}


export default Table;