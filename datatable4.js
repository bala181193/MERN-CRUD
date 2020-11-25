import React from 'react';
import axios from 'axios';
import $ from 'jquery'; 
import { CSVLink } from "react-csv";
//Datatable Modules
import 'jquery/dist/jquery'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'datatables.net/js/jquery.dataTables'
import 'datatables.net-buttons/js/buttons.print'
import '../../data_table5.css'
require('datatables.net-buttons/js/dataTables.buttons')
require('datatables.net-buttons/js/buttons.flash')
require('datatables.net-buttons/js/buttons.html5');
require('datatables.net/js/jquery.dataTables')
const jzip = require( 'jzip');
window.JSZip = jzip;

const headers = [
    { label: "ID", key: "_id" },
    { label: "ProductName", key: "product_name" },
    { label: "Price", key: "price" },
    { label: "Image", key: "image" },
    { label: "user_id", key: "user_id" },

  ];
   
const format= ( d ) =>{
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0"  style="padding-left:5px;">'+
        '<tr>'+
            '<td>ID:</td>'+
            '<td>'+d._id+'</td>'+ 
        '</tr>'+
        '<tr>'+
            '<td>UserID:</td>'+
            '<td>'+d.user_id+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}
class Datatable4 extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    
    }
    componentDidMount(){     
      
       
        $(document).ready(function() {
       var table=  $('#example').DataTable( {
        serverSide: true,
                "ajax": 'http://localhost:4000/product_cart_list',
               
                "columns": [
                    {
                        "className":      'details-control',
                        "orderable":      false,
                        "data":           null,
                        "defaultContent": ''
                    },
                   
                    { "data": "product_name" },
                    { "data": "price" }
              ], 
             
             
              orderCellsTop: true,
              fixedHeader: true,
           
          "lengthChange": true,
                    "dom": 'Bfrtip',
                    "buttons": [
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                    ],
        
               "order": [[1, 'asc']],

            
            } );


         
          //  Add event listener for opening and closing details
            $('#example tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row( tr );
                console.log(tr,"tr")
         console.log(row,"row")
                if ( row.child.isShown() ) {
                
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');

                }
                else {
                    console.log(row.data());
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );
        //    $('#example thead tr').clone(true).appendTo( '#example thead' );
        //     $('#example thead tr:eq(1) th').each( function (i) {
        //         var title = $(this).text();
        //         $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
         
        //         $( 'input', this ).on( 'keyup change', function () {
        //             if ( table.column(i).search() !== this.value ) {
        //                 table
        //                     .column(i)
        //                     .search( this.value )
        //                     .draw();
        //             }
        //         } );
        //     } );  
           
            
        } );
  
  
axios.get('http://localhost:4000/product_cart_list')
.then(res=>{
    console.log(res.data.data)
    this.setState({
        data:res.data.data
    })
})
    }


    componentWillUnmount() {

    }


    render(){
        const{data}=this.state
        return(
            <div>
 {/*<CSVLink
  data={data}
  headers={headers}
  filename={"my-file.csv"}
  className="btn btn-primary"
  target="_blank"
>
  CSV
 </CSVLink>;*/}
              
                <table id="example" class="display" style={{width:'100%'}}>
        <thead>
            <tr>
                <th></th>
                <th>product_name</th>
                <th>Price</th>
            </tr>
        </thead>
       <tbody>

       </tbody>
    </table>
            </div>
        )
    }
}

export default Datatable4