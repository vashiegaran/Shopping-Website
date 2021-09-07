import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent  {

  constructor(private router:Router){

  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}


