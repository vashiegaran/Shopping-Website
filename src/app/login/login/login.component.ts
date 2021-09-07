import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
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


  constructor(private _backendService:BackendService) { }

  ngOnInit() {
  //  this.userLoggedin=false;
    this.getAuthStatus();
  }
  getAuthStatus() {

    this.dataLoading=true;

     this._backendService.redirectLogin().then((result)=>{

      if(result.credential){
        console.log(result.credential);
        if(result.credential["accessToken"] !=null){
          console.log("it works")
          this.userLoggedin=true;

        
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
      return this._backendService.logout().then((success)=>{
        this.userLoggedin=false;
        this.dataLoading=false;

      });
  }

}
