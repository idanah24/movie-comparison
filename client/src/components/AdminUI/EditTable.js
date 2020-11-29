import React from 'react';
import EditRow from './EditRow';



class EditTable extends React.Component {

    state = { rows: this.props.rows };

    render() {
        return (

            <div className="table-responsive">


                <table className="table table-hover table-responsive">


                    <tbody>

                        {this.props.rows.map((row) => <EditRow row={row} key={row.id} />)}

                    </tbody>

                </table>
            </div>


        );
    }


}


export default EditTable;