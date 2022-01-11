import { Component } from '@angular/core';
import { Router,NavigationStart} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private router: Router){}

  title = 'salonfrontEnd';
  public isclick:boolean=true;

  btnClick () {
    this.router.navigateByUrl('/Facilitator');
};
  ChangeRoute(){
    this.isclick=false;
  }
}
