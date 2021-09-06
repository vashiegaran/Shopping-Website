import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import firebase = require('firebase');
import { ObserversModule } from '@angular/cdk/observers';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public afAuth:AngularFireAuth ) { }




  getConfig(){
   // return environment.social;
  }

  getCartTotal(){
    let fake="10";
    return Observable.create(

      observe=>{
        setTimeout(()=>{
          observe.next(fake)
        },2000
        )
      }
    )
  }

  getUserStatus(){

    let fake="10";
    return Observable.create(

      observe=>{
        setTimeout(()=>{
          observe.next(fake)
        },2000
        )
      }
    )

  }

  

  login(loginType,formData?){
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    
    if(formData){
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email
        ,formData.password);
    }else{
      let loginMethod;
        if(loginType == "GOOGLE" ){loginMethod = new firebase.auth.GoogleAuthProvider() }
      return this.afAuth.auth.signInWithRedirect(loginMethod);
    }
  
  
  }

  redirectLogin(){
      return this.afAuth.auth.getRedirectResult();
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  isUserLoggedin(){
    return this.afAuth.authState;

  }

  getProducts(_collType){
    let fake=[ {
      
      'category':"test",
      'name':"test",
      'price':"300",
      '_id':"123",


    }];
    return Observable.create(
      observe=>{
        setTimeout(()=>{


          observe.next(fake);
      },2000)


      }



    )
  }

  getFilterProducts(_collType,filter){
    let fake=[ {
      
      'category':"test",
      'name':"test",
      'price':"300",
      '_id':"123",


    }];
    return Observable.create(
      observe=>{
        setTimeout(()=>{


          observe.next(fake);
      },2000)


      }



    )

  }


  setProducts(_collType,filter){

    let fake="10";
    return Observable.create(

      observe=>{
        setTimeout(()=>{
          observe.next(fake)
        },2000
        )
      }
    )

  }


  updateProduct(_collType,filter){

    let fake=true;
    return Observable.create(

      observe=>{
        setTimeout(()=>{
          observe.next(fake)
        },2000
        )
      }
    )

  }

  getOneProductDoc(_collType,docId){
    let fake= {
      
      'category':"test",
      'name':"test",
      'price':"300",
      '_id':"123",


    };
    return Observable.create(
      observe=>{
        setTimeout(()=>{


          observe.next(fake);
      },2000)


      }



    )


  }


  delOneProduct(_collType,docId){
    let fake=true;
    return Observable.create(

      observe=>{
        setTimeout(()=>{
          observe.next(fake)
        },2000
        )
      }
    )


  }

  
  updateShoppingInterest(_collType,data){
    let fake=true;
    return Observable.create(

      observe=>{
        setTimeout(()=>{
          observe.next(fake)
        },2000
        )
      }
    )



  }

  updateShoppingCart(_collType,data){
    let fake=true;
    return Observable.create(

      observe=>{
        setTimeout(()=>{
          observe.next(fake)
        },2000
        )
      }
    )



  }


}
