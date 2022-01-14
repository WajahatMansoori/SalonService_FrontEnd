import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-salon-services',
  templateUrl: './salon-services.component.html',
  styleUrls: ['./salon-services.component.css']
})
export class SalonServicesComponent implements OnInit {

  public ServiceName:any;
  public Serviceprice:any;
  public IsAdd:boolean=false;
  public Isedit:boolean=false;
  public ServiceId:any;
  public Servicelist:any;
  cols: any[];
  exportColumns: any[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.GetSolonServices();

    this.cols = [
      { field: 'ServiceName', header: 'ServiceName' },
      { field: 'ServicePrice', header: 'ServicePrice' },            
  ];
  }


exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.Servicelist);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "SalonProducts");
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

  GetSolonServices(){
    let url=`http://localhost:1374/api/Getsalonservices`;
    this.http.get(url).subscribe((res:any)=>{
      if(res){
        this.Servicelist=res;
      }
    },error=>{
      console.log("something went wrong");
    });
  }

  openModal(){
    this.ServiceName='';
    this.Serviceprice='';
    this.IsAdd=true;
  }

  AddSalonServices(){
    var tempobj={
      ServiceName:this.ServiceName,
      ServicePrice:this.Serviceprice
    }
    let url=`http://localhost:1374/api/AddSalonService`;
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.GetSolonServices();
        this.IsAdd=false;
      }
      // this.GetSolonServices();
      // this.IsAdd=false;
    },error=>{
      console.log("something went wrong");
    });
  }

  EditSalonService(Id,ServiceName,ServicePrice){
    
      this.Isedit=true;
      this.ServiceId=Id;
      this.ServiceName=ServiceName,
      this.Serviceprice=ServicePrice
    
  }

  UpdateSalonService(){
    var tempobj={
      Id:this.ServiceId,
      ServiceName:this.ServiceName,
      ServicePrice:this.Serviceprice
    };
    let url=`http://localhost:1374/api/UpdateSalonService`;
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.Isedit=false;
        this.GetSolonServices();
      }
      // this.Isedit=false;
      // this.GetSolonServices();
    },error=>{
      console.log("something went wrong");
    })
  }

  DeleteSalonService(Id){
    var tempobj={
      Id:Id
    };
    let url=`http://localhost:1374/api/DeleteSalonService`;
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.GetSolonServices();
      }
      // this.GetSolonServices();
    },error=>{
      console.log("something went wrong");
    })
  }
  closeModal(){
    this.IsAdd=false;
    this.Isedit=false;
  }
}
