import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-facilitator',
  templateUrl: './facilitator.component.html',
  styleUrls: ['./facilitator.component.css']
})
export class FacilitatorComponent implements OnInit {

  public FacilitatorList:any;
  public IsAdd:boolean=false;
  public FacilitatorName:any;
  public Salary:any;
  public Isedit:boolean=false;
  public FacilitatorId:any;
  cols: any[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'FacilitatorName', header: 'FacilitatorName' },
      { field: 'Salary', header: 'Salary' },      
      { field: 'IsBooked', header: 'isBooked' },      
  ];
    this.getdata();
  }

  openModal(){
    this.IsAdd=true;
  }
  closeModal(){
    this.IsAdd=false;
  }

  getdata(){
    let url=`http://localhost:1374/api/GetFacilator`;
    this.http.get(url).subscribe((res:any)=>{
      if(res){
        this.FacilitatorList=res;
        console.log("Data get",this.FacilitatorList);
      }
    },error=>{
      console.log("Something went wrong");
    });
  }

  AddFacilitator(){
    debugger;
    var TempObj={
      FacilitatorName:this.FacilitatorName,
      Salary:this.Salary
    };
    let url=`http://localhost:1374/api/AddFacilitator`
    this.http.post(url,TempObj).subscribe((res:any)=>{
      if(res){
        this.IsAdd=false;
        this.getdata();
      }
    },error=>{
      console.log("Something went wrong");
    });
  }

  EditFacilitator(Id,Name,Salary){
    debugger;
    this.Isedit=true;
    this.FacilitatorId=Id;
    this.FacilitatorName=Name;
    this.Salary=Salary;
  }

  UpdateFacilitator(){
    debugger;
    var tempobj={
      Id:this.FacilitatorId,
      FacilitatorName:this.FacilitatorName,
      Salary:this.Salary
    };
    let url=`http://localhost:1374/api/UpdateFacilitator`
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.Isedit=false;
        this.getdata();
      }      
    },error=>{
      console.log("Something Went wrong");
    });

  }

  DeleteFacilitator(Id){
    var tempobj={
      Id:Id
    }
    let url=`http://localhost:1374/api/DeleteFacilitator`;
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.getdata();
      }  
    },error=>{
      console.log("something went wrong");
    })
  }


}
