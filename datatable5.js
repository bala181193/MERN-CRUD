import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import axios from 'axios';
// import Card from "@material-ui/core/Card";
// import SortIcon from "@material-ui/icons/ArrowDownward";
// import movies from "./movies";
// import "./styles.css";

const columns = [
  {
    name: "id",
    selector: "id",
    sortable: true
  },
  {
    name: "title",
    selector: "title",
    sortable: true
  },
  {
    name: "body",
    selector: "body",
    sortable: true
  },
];
const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };
class DataTable5 extends React.Component{

constructor(props){
    super(props)

    this.state={
        data:[]
    }
}

componentDidMount(){
    axios.get('http://jsonplaceholder.typicode.com/posts')
    .then(res=>{
        console.log(res.data)
        this.setState({
            data:res.data
        })
        console.log("data",this.state.data)
    })

  }
  render(){
      return(
          <div>
               <DataTable
          title="Movies"
          columns={columns}
          data={this.state.data}
          defaultSortField="product"
          pagination
          selectableRows
          expandableRows={true}
          customStyles={customStyles}
        />
          </div>
      )
  }

}

export default DataTable5