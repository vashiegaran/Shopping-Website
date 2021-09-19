import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  userLoggedin :boolean =false;
  error:boolean = false;
  errorMessage:String ="";
  dataLoading :boolean = false;
  


  constructor(private _backendService:BackendService,private router:Router) { }

   ngOnInit() {
  //  this.userLoggedin=false;
  this.doSomething();
      console.log(this.userLoggedin)
  }

  checkOut(page:string):void{
    let Link = new AppComponent(this.router);
    Link.goToPage(page);
  }

  isLoggedIn() {
    return this._backendService.afAuth.authState.pipe(first()).toPromise();
 }
 
 async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {
        this.router.navigate(['/home'])
      console.log(user.displayName)
    } else {
      console.log("not logged in")
   }
 }

  getAuthStatus() {

    
    return this._backendService.afAuth.auth.onAuthStateChanged(function(user){
      if (user)
      {

        this.userLoggedin=true;
        this.dataLoading=false;
        console.log(user.displayName)

      }else{
        console.log(user.displayName)
        console.log(user)
        this.userLoggedin=false;
        this.dataLoading=false;

      }

    });
    
  /*
     this._backendService.redirectLogin().then((result)=>{
      console.log(result.user.displayName)

      if(result.credential){
        console.log(result.credential);
        if(result.credential["accessToken"] !=null){
          console.log("works")
          this.userLoggedin=true;

        
        }else{
          console.log("doesnt work")
        }
       
      }
        this.dataLoading=false;
    }).catch(
      (err)=>{

        this.error=true;
        this.errorMessage=err.message;
        console.log(err);
        this.userLoggedin=false;
        this.dataLoading=false;

      });
*/
      this.dataLoading=false;


  }


  login(loginType,formData?){

    this.dataLoading=true;
    return this._backendService.login(loginType,formData).catch(
      (err)=>{
        this.error=true;
        this.errorMessage=err.message;
        console.log(err);
        this.userLoggedin=false;
        this.dataLoading=false;

      });


    

   
  }



  logout(){
      this.dataLoading=true;
      this.userLoggedin=false;

      return this._backendService.logout().then((success)=>{
        this.dataLoading=false;

      });
  }

}
