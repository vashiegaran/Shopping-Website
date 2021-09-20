import { Component, OnInit, TemplateRef } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MatDialog } from '@angular/material';

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

  constructor(private _backendService:BackendService,private dialog: MatDialog) { }
  

  ngOnInit() {
    this.getDoc(this._backendService.afAuth.auth.currentUser.uid);
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
}
