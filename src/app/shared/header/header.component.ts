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
  error: boolean;
  errorMessage: any;

  constructor(private router:Router,private _backendService:BackendService,private dialog: MatDialog) { }
  userName;
  logOut:boolean;
  Login:boolean;
  showModalBox: boolean = false;
  display = "none";
  querySubcription: any;
  members: any[];
  items: any[];

  ngOnInit() {
    this.getData()
    this.doSomething();
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }


  link(page:string):void{
    let Link = new AppComponent(this.router,this._backendService);
    Link.goTo(page);
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

getData(){
  
  this.querySubcription =this._backendService.getDocs('wishlist')
      .subscribe(members =>{
        this.members = members;
         // console.log(this.members);
      },

      (error)=>{
        this.error=true;
        this.errorMessage=error.message;
      },
      ()=>{this.error=false;});

      
      
}

}
