import { Component, OnInit, TemplateRef } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import {WindowService} from 'src/app/window.service'
import firebase = require('firebase');
import { environment } from 'src/environments/environment';





export class PhoneNumber {
  num:string

  // format phone numbers as E.164
  get e164() {
    const num = this.num
    return `+${num}`
  }

}




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

 export class LoginComponent implements OnInit {
  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;

  user: any;

  userLoggedin :boolean =false;
  error:boolean = false;
  errorMessage:String ="";
  dataLoading :boolean = false;
  


  constructor(private _backendService:BackendService,private router:Router,private win: WindowService,private dialog: MatDialog) {
    
   }

    auth = firebase.auth();
   googleProvider = new firebase.auth.GoogleAuthProvider();

   ngOnInit() {

   
  
  //  this.userLoggedin=false;
      this.doSomething();
      console.log(this.userLoggedin)
      this.windowRef = this.win.windowRef;

  }

  /* This is merging two accounts*/

  mergeAndUnmergeWithGoogle() {
    const user = this.auth.currentUser;
    if(user) {
        const providerIndex = this.checkIfLinked(user, 'google.com');
        if(providerIndex != -1)
            this.unmerge(user, providerIndex);
        else
            this.merge(user, this.googleProvider);
    }
  }

  merge = (previousUser, provider) => {
    // provider can be "google.com" or "twitter.com" etc..
    // We're basically signing in the user a second time with the social media account
    // that they want it to be merged with the current one.
    this.auth.signInWithPopup(provider)
    .then(user => {
        const secondAccountCred = user.credential;
        // Then we're deleting the current social media provider to prevent any conflicts in case it's used to connect to another account on your app.
        // The current user here means the one he just signed in with clicking on the merge button.
        this.auth.currentUser.delete()
        .then(() => {
            // Now we're connecting the previousUser which represents the provider account that the user used to 
            // sign in to the app at the very beginning.
            return previousUser.linkWithCredential(secondAccountCred);
        })
        .then(() => {
            // Reconnecting to the app.
            this.auth.signInWithCredential(secondAccountCred);
            console.log('Accounts linked successfully!');
        })
    })
  }

  unmerge = (user, providerIndex) => {
    user.unlink(user.providerData[providerIndex].providerId)
    .then(() => {
        console.log('Unlinked successfully!');
    })
    .catch(error => {
        console.error(error);
    })
  }

  checkIfLinked = (user, providerId) => {
    //provider Data is an array that contains the providers linked to their account
    // "google.com", "twitter.com", etc..
    const userProviders = user.providerData;
    let providerIndex = -1;
    for(let i = 0; i < userProviders.length; i++) {
        if(userProviders[i].providerId === providerId)
            providerIndex = i;
    }
    //-1 if the provider doesn't exist
    return providerIndex;
  }
  
  

    /* This is merging two accounts*/

      goTo(){
        this.router.navigate(['/profile'])
      }

  alertUser(templateRef: TemplateRef<any>) {

    setTimeout(function() {
      this.window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'normal',
          'callback': function(response) {
              console.log("success", response);
          },
          'expired-callback': function() {
              console.log("expired-callback");
          }
      });
  
      this.recaptchaVerifier.render().then(function(widgetId) {
          this.window.recaptchaWidgetId = widgetId;
      });
    });


    this.dialog.open(templateRef);
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;
    console.log(num)

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

 

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;
                    console.log("phone user"+result.currentUser.uid)

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }



  checkOut(page:string):void{
    let Link = new AppComponent(this.router);
    Link.goToPage(page);
  }


  isLoggedIn() {
    return this._backendService.afAuth.authState.pipe(first()).toPromise();
 }
 
 async doSomething() {
   console.log("do something")
    const user = await this.isLoggedIn()
    if (user) {
        this._backendService.saveUserData('user',user)
        this.router.navigate(['/home'])
      console.log(user.phoneNumber)
    } else {
      console.log("this is not logged in")
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


  }


  login(loginType,formData?){
    console.log(loginType)
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

  saveUserData(){




  }



  logout(){
      this.dataLoading=true;
      this.userLoggedin=false;

      return this._backendService.logout().then((success)=>{
        this.dataLoading=false;

      });
  }

}
