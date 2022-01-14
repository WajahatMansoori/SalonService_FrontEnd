import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  cols: any[];
  exportColumns: any[];
  public InvoiceList:any;
  public IsAdd:boolean=false;
  public ProductList:any;
  public InvoiceAmount:any;
  public ProductName:any;
  public AvailableQuantity:any;
  public InvoiceDate:any;
  public InvoiceId:any='';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.GetInvoices();
    this.GetSalonProducts();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.InvoiceList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "InvoiceList");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }


  GetInvoices(){
    let url=`http://localhost:1374/api/GetallInvoices`;
    this.http
    .get(url)
    .subscribe((res:any)=>{
      if(res){
        this.InvoiceList=res;
      }
    },error=>{
      console.log("Something went wrong");
    });
  }

  GetSalonProducts(){
    let url=`http://localhost:1374/api/GetSalonProduct`;
    this.http.get(url).subscribe((res:any)=>{
      if(res){
        this.ProductList=res;
      }
    },error=>{
      console.log("Something went wrong");
    });
  }

  AddSalonInvoice(){
    debugger;
    var tempobj={
      SalonProductsId:this.InvoiceId,
      InvoiceAmount:this.InvoiceAmount,
      InvoiceDate:this.InvoiceDate,
      ProductQuantity:this.AvailableQuantity
    }
    let url=`http://localhost:1374/api/InsertInvoice`;
    this.http
    .post(url,tempobj)
    .subscribe((res:any)=>{
      if(res){
        this.IsAdd=false;
        this.GetInvoices();
      }
    },error=>{
      console.log("something went wrong");
    })
  }

  openModal(){    
    this.IsAdd=true;
  }
  closeModal(){
    this.IsAdd=false;
   // this.Isedit=false;
  }
}
