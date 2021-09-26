import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminusersComponent implements OnInit {

  userProf;
  myDocData;
  display;
  constructor(private _backendService:BackendService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    this._backendService.getDocs('user').subscribe(prof=>{

      this.userProf=prof;
      this.myDocData=prof;

    })

  }


  openModal(data) {
    console.log(data)
    this.myDocData=data;
        this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }


/*
  getAuthStatus() {

    
    return this._backendService.afAuth.auth.(function(user){
      if (user)
      {


        this.userProf = user;
        console.log(user.displayName)

      }else{
        console.log(user.displayName)
        console.log(user)
        
      }

    });
    
  }
*/
}
