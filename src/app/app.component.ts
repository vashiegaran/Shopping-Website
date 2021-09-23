import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router'
import { BackendService } from './services/backend.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent  {

  constructor(private router:Router,private _backendService:BackendService){

  }

  goToPage(pageName:string,id?:any ):void{
    this.router.navigate([`${pageName}`,id])
      
  }

  goTo(pageName:string, ):void{
    this.router.navigate([`${pageName}`])
      
  }

 
}


