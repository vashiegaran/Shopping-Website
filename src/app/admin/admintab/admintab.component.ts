import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { AppComponent } from 'src/app/app.component';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-admintab',
  templateUrl: './admintab.component.html',
  styleUrls: ['./admintab.component.scss']
})
export class AdmintabComponent implements OnInit {

  constructor(private _backendService:BackendService) { }

  isAdmin:Boolean;


  ngOnInit() {
    this.isAdmin=true;
    console.log(this.isAdmin)
  }

  async canActivate():Promise<Observable<boolean>>{
    return (await this._backendService.isUserAdmin())
    .take(1)
    .map(res =>
      {
        if(res){
          return res.isadmin;
        }else{
          return false;
        }
      })
      .do(isadmin=>{
        console.log(isadmin);
        this.isAdmin = true;
      })
  }

}
