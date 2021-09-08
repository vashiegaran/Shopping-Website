import { Component, OnInit ,Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 @Input() pageTitle:string;

  constructor(private router:Router,private _backendService:BackendService) { }

  ngOnInit() {
  }

  link(page:string):void{
    let Link = new AppComponent(this.router);
    Link.goToPage(page);
  }

  Logout(){
  //  this.Log.
    return this._backendService.logout();
  }
}
