import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-salon-product-management',
  templateUrl: './salon-product-management.component.html',
  styleUrls: ['./salon-product-management.component.css']
})
export class SalonProductManagementComponent implements OnInit {

  cols: any[];
  public IsAdd:boolean=false;
  public Isedit:boolean=false;
  public ProductList:any;
  public ProductName:any;
  public ProductId:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'ProductName', header: 'ProductName' },
      { field: 'AvailableQuantity', header: 'AvailableQuantity' },            
  ];
  this.GetSalonProducts();
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
  
  AddSalonProduct(){   
    var tempobj={
      ProductName:this.ProductName
    };
    let url=`http://localhost:1374/api/AddSalonProduct`;
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.IsAdd=false;
        this.GetSalonProducts();
      }
    },error=>{
      console.log("something went wrong");
    });
  }

  EditSalonProduct(Id,Name){    
    this.Isedit=true;
    this.ProductId=Id;
    this.ProductName=Name;
  }

  UpdateSalonProduct(){
    var tempobj={
      Id:this.ProductId,
      ProductName:this.ProductName
    };
    let url=`http://localhost:1374/api/UpdateSalonProduct`;
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.Isedit=false;
        this.GetSalonProducts();
      }
    },error=>{
      console.log("something went wrong");
    });
  }

  DeleteProduct(Id){
    var tempobj={
      Id:Id
    };
    let url=`http://localhost:1374/api/DeleteSalonProduct`
    this.http.post(url,tempobj).subscribe((res:any)=>{
      if(res){
        this.GetSalonProducts();
      }
    },error=>{
      console.log("something went wrong");
    })
  }

  openModal(){
    this.ProductName='';
    this.IsAdd=true;
  }
  closeModal(){
    this.IsAdd=false;
    this.Isedit=false;
  }

}
