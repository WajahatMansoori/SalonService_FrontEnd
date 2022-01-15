import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-salon-appointment',
  templateUrl: './salon-appointment.component.html',
  styleUrls: ['./salon-appointment.component.css']
})
export class SalonAppointmentComponent implements OnInit {

  cols: any[];
  exportColumns: any[];
  public IsAdd:boolean=false;
  public AppointmentList:any;
  public clientName:any;
  public clientPhone:any;
  public appointmentDate:any;
  public facilityId:any='';
  public ServiceId:any;
  public FacilitatorList:any;
  public Servicelist:any;
  public ischecked:boolean;
  public appointmenttime:any;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.GetAppointmentList();
    this.getAvailableFaciliatators();
    this.GetSolonServices();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.AppointmentList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "AppointmentList");
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

    GetAppointmentList(){
      let url=`http://localhost:1374/api/GetAppointmentlist`;
      this.http
      .get(url)
      .subscribe((res:any)=>{
        if(res){
          this.AppointmentList=res;
        }
      },error=>{
        console.log("something went wromg");
      });
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
    
    getAvailableFaciliatators(){
      let url=`http://localhost:1374/api/GetAvailablefacilitator`;
      this.http.get(url).subscribe((res:any)=>{
        if(res){
          this.FacilitatorList=res;
          console.log("Data get",this.FacilitatorList);
        }
      },error=>{
        console.log("Something went wrong");
      });
    }

    MarkasServed(SalonFacilitatorId){
      debugger;
      let url=`http://localhost:1374/api/MarkasServed/?facName=${SalonFacilitatorId}`;
      this.http
      .get(url)
      .subscribe((res:any)=>{
        if(res){
          this.GetAppointmentList();
        }
      },error=>{
        console.log("something went wrong");
      });
    }

    BookAppointment(){
      debugger;
      var Tempobj={
        ClientName:this.clientName,
        ClientPhone:this.clientPhone,
        SalonServicesId:this.ServiceId,
        SalonFacilitatorId:this.facilityId,
        AppointDate:this.appointmentDate,
        SlotTime:this.appointmenttime
      };
      let url=`http://localhost:1374/api/InsertAppointment`;
      this.http
      .post(url,Tempobj)
      .subscribe((res:any)=>{
        if(res){
          this.IsAdd=false;
          this.GetAppointmentList();
        }
      },error=>{
        console.log("something went wromg");
      });
    }

    openModal(){    
      this.IsAdd=true;
    }
    closeModal(){
      this.IsAdd=false;
     // this.Isedit=false;
    }
}
