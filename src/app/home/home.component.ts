import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isclick:boolean=true;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  
  btnClick () {
    this.router.navigateByUrl('/Facilitator');
};
  ChangeRoute(){
    this.isclick=false;
  }

}
