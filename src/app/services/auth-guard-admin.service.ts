import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { TouchSequence } from 'selenium-webdriver';
import { BackendService } from './backend.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{

  constructor(private _backendService:BackendService) { }
  canActivate():Observable<boolean>{
    return this._backendService.isUserAdmin()
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
        return true;
      })
  }
}
