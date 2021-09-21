import { Component, OnInit, TemplateRef } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error: boolean;
  errorMessage: any;
  myDocData;
  querySubcription: any;
  toggleField: string;
  samePass:boolean;
  public pass1: string;
  public pass2: string;


  constructor(private _backendService:BackendService,private dialog: MatDialog , private router:Router) { }
  

  ngOnInit() {
    this.getDoc(this._backendService.afAuth.auth.currentUser.uid);
    this.toggleField = "profile";

  }
  

  goTo(page:string){
    this.router.navigate([page])
  }

  getDoc(docId){
    console.log(docId)
    this.querySubcription =this._backendService.getOneProductDoc('user',docId)
        .subscribe(res =>{
      //    console.log(res)
          if(res){
            this.myDocData = res;
            console.log(this.myDocData.Username)


          } else{
            console.log("not working")
          }
     

        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
        },
        ()=>{this.error=false; });
        
  }

  updateData(formData){

    console.log("this data:"+formData)
    this.querySubcription =this._backendService.updateUser('user',formData,this._backendService.afAuth.auth.currentUser.uid);
       
     
  
  }

  alertUser(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  toggle(filter?) {
    if (!filter) { filter = "profile" }
    else { filter = filter; }
    this.toggleField = filter;
}

checkSame(pass: string , pass2:string) {

  if (pass === pass2) {
    return this.samePass =true;
    console.log(pass +"==",pass2)
    console.log(this.samePass)
  } else {
    return this.samePass =false
    console.log(pass +"==",pass2)
    console.log(this.samePass)

  }
}
}
