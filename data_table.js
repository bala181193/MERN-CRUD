import React, { Component ,Fragment} from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import {CSVLink} from 'react-csv';
class Datatable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [
              {
                "id": "55f14312c7447c3da7051b26",
                "address": "228 City Road",
                "name": ".CN Chinese",
                "postcode": "3JH",
                "rating": 5,
                "type_of_food": "Chinese"
              },
              {
                "id": "55f14312c7447c3da7051b27",
                "address": "376 Rayleigh Road",
                "name": "@ Thai",
                "postcode": "5PT",
                "rating": 5.5,
                "type_of_food": "Thai"
              },
              {
                "id": "55f14312c7447c3da7051b28",
                "address": "30 Greyhound Road Hammersmith",
                "name": "@ Thai Restaurant",
                "postcode": "8NX",
                "rating": 4.5,
                "type_of_food": "Thai"
              },
              {
                "id": "55f14312c7447c3da7051b29",
                "address": "30 Greyhound Road Hammersmith",
                "name": "@ Thai Restaurant",
                "postcode": "8NX",
                "rating": 4.5,
                "type_of_food": "Thai"
              }
            ]
        }
        this.columns = [
            {
                key: "name",
                text: "Name",
                className: "name",
                sortable: true
            },
            {
                key: "address",
                text: "Address",
                sortable: true
            },
            {
                key: "postcode",
                text: "Postcode",
                className: "postcode",
                sortable: true
            },
            {
                key: "rating",
                text: "Rating",
                className: "rating",
                sortable: true
            },
            {
                key: "type_of_food",
                text: "Type of Food",
                className: "type_of_food",
                sortable: true
            },
         /*   {
                key: "action",
                text: "Action",
                cell: (record, index) => {
                    return (
                        <div>
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.editRecord.bind(this, record, index)}
                                style={{marginRight: '5px'}}>
                                    Edit
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={this.deleteRecord.bind(this, record, index)}>
                                    Delete
                            </button>
                        </Fragment>
                       
                        </div>
                    );
                }
            }*/
        ];
        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            pagination: 'advance',
            filename: "restaurents",
            
            button: {
                
               
                csv: true,
                excel: true,
                print: true,
                
            }
        }
      
    }

    editRecord = (record, index) => {
        console.log("Edit record", index, record);
    }

    deleteRecord = (record, index) => {
        console.log("Delete record", index, record);
    }

    render() {
        const{records}=this.state
        return (
            <div>
            <ReactDatatable id="data_table"
                config={this.config}
                records={records}
               columns={this.columns}
               
               />
              <div>  

            <ReactHTMLTableToExcel  
                    className="btn btn-info"  
                    table={"data_table"} 
                    filename="ReportExcel"  
                    sheet="Sheet"  
                    buttonText="Export excel" />  
                        </div>  
                        <CSVLink
                        data={records}
                        filename={"my-file.csv"}
                        className="btn btn-primary"
                        target="_blank"
                        >
                            CsvLINK
                            </CSVLink>
                </div>
        );
    }
}

export default Datatable;