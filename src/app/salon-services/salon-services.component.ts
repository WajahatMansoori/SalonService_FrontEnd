import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.GetSolonServices();
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

      }
      this.GetSolonServices();
      this.IsAdd=false;
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

      }
      this.Isedit=false;
      this.GetSolonServices();
    },error=>{
      console.log("something went wrong");
    })
  }

  closeModal(){
    this.IsAdd=false;
  }
}
