import { useMemo } from 'react';
import {useTable} from 'react-table';
import COLUMNS from './Columns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
// import './table.css';
let MOCK_DATA = [
    {
        id: 1,
        name: "The Godfather 1",
        imdb_url: "www.google.com",
        rating: 6,
        votes: 0,
        created_at: "2020-11-26 02:30:5"
    },
    {
        id: 2,
        name: "Goodfellas",
        imdb_url: "www.goo.com",
        rating: 10,
        votes: 15,
        created_at: "2020-11-26 12:30:2"
    }
];

const renderRows =  (row) => {

  let newRow = {};

  // Defining movie title output
  newRow.name = 
    <span className="lead">
      <span className="badge badge-info" style={{}}>{row.name}</span>
    </span>
  ;
  // Defining rating output
  newRow.rating = 
    <p className="text-justify">
      Our rating:<br></br>{row.rating}
      </p>
      ;
  
      // Defining votes & like output
  newRow.votes = 
      <div>
      <p className="text-justify">{row.votes}<br></br>people like<br></br>{row.name}</p>
      <button type="button" class="btn btn-default btn-lg">
      <FontAwesomeIcon icon={faThumbsUp} />
    </button>
    </div>
  ;

  // Defining imdb link
  newRow.imdb_url = 
    <a href={"//" + row.imdb_url} target="_blank" class="badge badge-success">Visit IMDB Page</a>
    ;
  
  return newRow;
}

MOCK_DATA = MOCK_DATA.map(renderRows); 

function Table() {


    const columns = useMemo(() => COLUMNS, []);

    let data = useMemo(() => MOCK_DATA, [])


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
      } = useTable({
        columns,
        data
    })



  return (

    <div className="table-responsive ">          
  <table className="table table table-hover" {...getTableProps()}>

        {/* <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead> */}

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>

        {/* <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
  </div>


    
  );
}

export default Table;
