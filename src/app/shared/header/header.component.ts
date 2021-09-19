import { Component, OnInit ,Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 @Input() pageTitle:string;

  constructor(private router:Router,private _backendService:BackendService) { }
  userName;
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

  isLoggedIn() {
    return this._backendService.afAuth.authState.pipe(first()).toPromise();
 }
 
 async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {
      this.userName = user;

      console.log(user.displayName)
    } else {
      console.log("not logged in")
   }
 }

}
