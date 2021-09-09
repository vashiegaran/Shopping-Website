import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import {Observable} from 'rxjs/Rx';
import { from } from 'rxjs';
import { map,take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public afAuth:AngularFireAuth,private router:Router) { }
  canActivate():Observable<boolean>{
    return Observable.from(this.afAuth.authState)
    .take(1)
    .map(state=>!!state)
    .do(authenticated=>
      {
        if (!authenticated)
          this.router.navigate(['/login']);
          console.log(this.afAuth.auth.currentUser.displayName)

      })
  }
}
