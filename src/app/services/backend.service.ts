import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import firebase = require('firebase');
import { ObserversModule } from '@angular/cdk/observers';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private itemDoc:AngularFirestoreDocument<any>;
  item:Observable<any>;
  private itemCollection :AngularFirestoreCollection<any>;
  constructor(public afAuth:AngularFireAuth ,private afs :AngularFirestore) { }
  public member = {
    company: '',
    counter: 25,
    usertype: 'regular',
    name: '',
    email: ''
}
  getDoc(callUrl:string){
      this.itemDoc= this.afs.doc<any>(callUrl);
      return this.itemDoc.valueChanges();
  }

  getDocs(coll:string,filters?:any){
    this.itemCollection = this.afs.collection<any>(this.getCollectionURL(coll));
    return this.itemCollection.valueChanges();
  }


  isUserLoggedIn(){
    return Observable.from(this.afAuth.authState)
    .take(1)
    .map(state => !!state)
    .do(authenticated=>{

      return authenticated;
    });

  }
 
  isUserAdmin(){

    let collUrl = !this.isUserLoggedin()? "nouser" :this.afAuth.auth.currentUser.uid;
    collUrl = "/OnlineStore/Store/admins/"+collUrl;
    return this.getDoc(collUrl);
  }


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

  get timestamp(){
    var d =new Date();
    return d;

  }

  getCollectionURL(filter){
    return "/OnlineStore/Store/" +filter;
  }

  setDocs(coll:string,data:any,docId?:any)
  {
      const id = this.afs.createId();
      const item = { id,name };
      const timestamp = this.timestamp;
      var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
      return docRef.set({
        ...data,
        _id:id, 
        updatedAt:timestamp,
        createAt: timestamp,
        delete_flag:"N",
        authid: this.afAuth.auth.currentUser.uid,
        username:this.afAuth.auth.currentUser.displayName,
        useremail:this.afAuth.auth.currentUser.email


      })
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

    let docUrl =this.getCollectionURL(_collType)+"/"+docId;

    this.itemDoc = this.afs.doc<any>(docUrl);
    return this.itemDoc.valueChanges();



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

  updateDocs(coll:string,data:any,docId?:any)
  {
      const id = this.afs.createId();
      const item = { id,name };
      const timestamp = this.timestamp;
      var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(data._id);
      return docRef.update({
        ...data,
        _id:id, 
        updatedAt:timestamp,
        authid: this.afAuth.auth.currentUser.uid,
        username:this.afAuth.auth.currentUser.displayName,
        useremail:this.afAuth.auth.currentUser.email


      })
  }

  deleteOneDocs(coll,docId)
  {
      const id = this.afs.createId();
      const item = { id,name };
      const timestamp = this.timestamp;
      console.log("delete")
      var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(docId);
      return docRef.update({

        delete_flag :"Y",
        _id:id, 
        updatedAt:timestamp,
        createAt: timestamp,
        authid: this.afAuth.auth.currentUser.uid,
        username:this.afAuth.auth.currentUser.displayName,
        useremail:this.afAuth.auth.currentUser.email


      })
  }


 




}
