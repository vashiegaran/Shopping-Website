import { Component, OnInit ,Input, TemplateRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 @Input() pageTitle:string;

  constructor(private router:Router,private _backendService:BackendService,private dialog: MatDialog) { }
  userName;
  logOut:boolean;
  Login:boolean;
  ngOnInit() {
    
    this.doSomething();
  }

  link(page:string):void{
    let Link = new AppComponent(this.router,this._backendService);
    Link.goToPage(page);
  }

  Logout(){
  //  this.Log.
  this.Login=false;
  console.log(this.Login)
  return this._backendService.logout();
    
  }

  isLoggedIn() {
    return this._backendService.afAuth.authState.pipe(first()).toPromise();
 }
 
 async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {
      this.Login=true
      console.log(this.Login)
      this.userName = user.displayName;

      console.log(user.displayName)
    } else {
      console.log("not logged in")
   }
 }

 alertUser(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

wishList(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

}
