import React from 'react';
import axios from 'axios';
import $ from 'jquery'; 
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
//Datatable Modules
import 'jquery/dist/jquery'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'datatables.net/js/jquery.dataTables'
import Workbook from 'react-excel-workbook'
import ReactExport from "react-data-export";
import xslx from 'xlsx'

// import 'datatables.net-buttons/js/buttons.print'
// import '../../data_table5.css'
// require('datatables.net-buttons/js/dataTables.buttons')
// require('datatables.net-buttons/js/buttons.flash')
// require('datatables.net-buttons/js/buttons.html5');
// require('datatables.net/js/jquery.dataTables')
import './column_search.css';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class ColumnSearch extends React.Component{
constructor(){
    super()
    this.state={
        data:[],
    }
}

componentDidMount(){
    $(document).ready(function () {
            var t = $('#table').DataTable({
                "paging": true,
                "pageLength": 10,
                "processing": true,
                "serverSide": true,
                'ajax': {
                    'type': 'POST',
                    'url': 'http://localhost:4000/product_cart_list1'
                },
                'columns':
                    [
                    { 'data': '_id',  'name': '_id' },
                    { 'data': 'product_name',  'name': 'product_name' },
                    { 'data': 'price',  'name': 'price' },
                    { 'data': 'user_id',  'name': 'user_id' }
                    ],
                "columnDefs": [
                    {
                        "searchable": false,
                        "orderable": true,
                        "targets": 0
                    }
                ],

                "order": [[1, 'asc']],
               
                
        })
       
    })
    axios.get('http://localhost:4000/product_cart_list')
.then(res=>{
    console.log("resdata",res.data.data)
    this.setState({
        data:res.data.data
    })
})

}
exportPDF = () => {
    
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["ID", "PRODUCT_NAME","PRICE","USER_ID"]];

    const data = this.state.data.map(elt=> [elt._id, elt.product_name,elt.price,elt.user_id]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

downloadTxtFile= (fileName) => {
    console.log(fileName,"filename")
    //Downloads the file
    let link = document.createElement("a");
    link.download = 'user.txt';
    let blob = new Blob([JSON.stringify(fileName)], { type: "text/plain" });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);

    // // Opens in new window
    // // let blob = new Blob(["Hello, world!"], { type: "text/plain" });
    // // const fileURL = URL.createObjectURL(blob);
    // // window.open(fileURL);
  };
  
//   downloadEmployeeData = () => {
//     fetch('http://localhost:4000/product_cart_list')
//         .then(response => {
//             response.blob().then(blob => {
//                 let url = window.URL.createObjectURL(blob);
//                 let a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'user.txt';
//                 a.click();
//             });
//             //window.location.href = response.url;
//     });
   
// }


render(){
    const {data}=this.state;
    return(
        <div class="datatable-container">
        <h2>Column Search in DataTables using Server-side Processing</h2>
        <CSVLink
  data={data}
  filename={"my-file.csv"}
  className="btn btn-primary"
  target="_blank"
>
  CSV
      </CSVLink>
 <div >
               
                <button onClick={this.downloadEmployeeData}>Download</button>
                <p/>
            </div>




 <div>
        <button onClick={() => this.exportPDF()}>PDF</button>
      </div>


      <div className="row text-center" style={{marginTop: '100px'}}>
    <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary">excel</button>}>
      <Workbook.Sheet data={data} name="Sheet A">
        <Workbook.Column label="Id" value="_id"/>
        <Workbook.Column label="product_name" value="product_name"/>
        <Workbook.Column label="price" value="price"/>
        <Workbook.Column label="user_id" value="user_id"/>
      </Workbook.Sheet>
    </Workbook>
  </div>
  <div>
        <button onClick={()=>this.downloadTxtFile(data)}>Download txt</button>
      </div>
        <table name="tbl-contact" id="table" class="display" cellspacing="0" width="100%">   

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>User ID</th>
                </tr>
            </thead>
            
        </table>
    </div>
    )
}
}




export default ColumnSearch