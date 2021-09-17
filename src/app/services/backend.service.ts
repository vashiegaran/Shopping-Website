import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import firebase = require('firebase');
import { ObserversModule } from '@angular/cdk/observers';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { TouchSequence } from 'selenium-webdriver';
import { map } from 'rxjs/internal/operators/map';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage'
import ref = require('firebase');


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  basePath = '/images';                       //  <<<<<<<
  downloadableURL = '';                      //  <<<<<<<
  task: AngularFireUploadTask;               //  <<<<<<<
  private itemDoc:AngularFirestoreDocument<any>;
  item:Observable<any>;
  private itemCollection :AngularFirestoreCollection<any>;
  private cartColletion :AngularFirestoreCollection<any>;
  getID:String;
  authState: any = null;
  iD:string;
  storageRef: firebase.storage.Reference;
  list: any[] = [];

  constructor(public afAuth:AngularFireAuth ,private afs :AngularFirestore,private afStorage: AngularFireStorage) {

    this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    });
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

      return this.afAuth.auth.onAuthStateChanged(function(user){
       console.log(user.displayName)
        if (user)
        {
          return true;
        }else{
          return false;
        }

      });
  }

  getYourItem(coll) {
    console.log(this.afAuth.auth.currentUser.uid)
    this.cartColletion = this.afs.collection<any>(this.getCollectionURL(coll),ref=>
    ref.where('customerId','==',this.afAuth.auth.currentUser.uid)
    )
    return this.cartColletion.valueChanges();
  
    /*
    console.log(this.afAuth.auth.currentUser.uid);
    this.cartColletion =this.afs.collection(this.getCollectionURL(coll), ref =>
        ref.where('delete_flag', '==', 'N')
            .where('authid', '==', this.afAuth.auth.currentUser.uid)
            .orderBy('name', 'desc')
            
    )
    //console.log(this.cartColletion);
    return this.cartColletion.valueChanges();
    */
}

getReview(coll,data) {
  this.cartColletion = this.afs.collection<any>(this.getCollectionURL(coll),ref=>
  ref.where('itemId','==',data._id)
  )
  return this.cartColletion.valueChanges();

  /*
  console.log(this.afAuth.auth.currentUser.uid);
  this.cartColletion =this.afs.collection(this.getCollectionURL(coll), ref =>
      ref.where('delete_flag', '==', 'N')
          .where('authid', '==', this.afAuth.auth.currentUser.uid)
          .orderBy('name', 'desc')
          
  )
  //console.log(this.cartColletion);
  return this.cartColletion.valueChanges();
  */
}

getImage(){
  console.log("working")
  this.storageRef = firebase.storage().ref().child('/images'+this.afAuth.auth.currentUser.uid+'yZeKFj8NczV5MYl0UK7r');
return this.storageRef.getDownloadURL().then(url => ref=>{
  console.log(ref);
  return ref;} );
}

  logout(){
    return this.afAuth.auth.signOut();
  }

  isUserLoggedin(){
    return this.afAuth.authState;

  }




  get timestamp(){
    var d =new Date();
    return d;

  }

  getCollectionURL(filter){
    return "/OnlineStore/Store/" +filter;
  }

  addReviewDoc(coll:string,formData:any[],data:any){

  
  
    const timestamp = this.timestamp
    console.log(this.getCollectionURL(coll))
    return this.afs.collection(this.getCollectionURL(coll)).add({

      ...formData,
      //author: this.afAuth.currentUser.uid,
      itemId: data._id,
      CustomerId:this.afAuth.auth.currentUser.uid,
      Customer: this.authState.displayName,
      CustomerEmail: this.authState.email,
      CustomerPhoto: this.authState.photoURL,
      CustomerPhone: this.authState.phoneNumber,
      createdAt: timestamp,
      delete_flag: "N",
      
    })
   
  }


  
  async setNewDoc(coll: string, data: any,filePath) {
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
    this.task =this.afStorage.upload('/images'+this.afAuth.auth.currentUser.uid+item.id, filePath);
    (await this.task).ref.getDownloadURL().then(url => {this.downloadableURL = url; 
    return docRef.set({
        ...data,
        _id: id,
        imageUrl : this.downloadableURL,      
         createdAt: timestamp,
        delete_flag: "N",
        username: this.authState.displayName,
        useremail: this.authState.email,
        author:this.afAuth.auth.currentUser.uid,
        status:"P",
        
        
    });
  });    
}

  setDocs(coll:string,data:any,docId?:any)
  {
    console.log(data._id)
      const id = this.afs.createId();
      const item = { id,name };
      const timestamp = this.timestamp;
      var docRef= this.afs.collection(this.getCollectionURL(coll),ref=>ref.where('_id', '==', data._id)
      .where('author','==',this.afAuth.auth.currentUser.uid)).snapshotChanges().pipe(
       map(actions => actions.map(a => {
           const id = a.payload.doc.id;
           return  id ;
       })))
       .subscribe(docID=>{
         docID.map(a=>{
           console.log(a)
           return this.afs.collection(this.getCollectionURL(coll)).doc(a).set({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp,
            delete_flag: "N",
            username: this.authState.displayName,
            useremail: this.authState.email,
            author:this.afAuth.auth.currentUser.uid
    
    
          })
 
         })
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


  updateProduct(coll,formData:any){
    console.log(formData._id)
    var docId=this.afs.collection(this.getCollectionURL(coll),ref => ref.where('_id', '==', formData._id)
     .where('author','==',this.afAuth.auth.currentUser.uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const id = a.payload.doc.id;
          return  id ;
      })))
     
    return this.updateDocs(this.getCollectionURL(coll),formData,docId);
}

  getOneProductDoc(_collType,docId){
   return this.afs.collection(this.getCollectionURL(_collType)).doc(docId).valueChanges();
  
    
  }

  
  updateShoppingInterest(coll: string, data){
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
    return docRef.set({
        ...data,
        author: this.authState.uid,
        authorName: this.authState.displayName,
        authorEmail: this.authState.email,
        authorPhoto: this.authState.photoURL,
        authorPhone: this.authState.phoneNumber,
        updatedAt: timestamp,
        createdAt: timestamp,
        delete_flag: "N",
    });
}

  updateShoppingCart(coll: string, data){
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
    return docRef.set({
        ...data,
        //author: this.afAuth.currentUser.uid,
        customerId: this.authState.uid,
        // authorName: this.afAuth.currentUser.displayName,
        // authorEmail: this.afAuth.currentUser.email,
        // authorPhoto: this.afAuth.currentUser.photoURL,
        // authorPhone: this.afAuth.currentUser.phoneNumber,
        customerName: this.authState.displayName,
        customerEmail: this.authState.email,
        customerPhoto: this.authState.photoURL,
        customerPhone: this.authState.phoneNumber,
        updatedAt: timestamp,
        createdAt: timestamp,
        delete_flag: "N",
    });
}

updatePurchase(coll: string, data,total){

  const timestamp = this.timestamp


    
    const id = this.afs.createId();
  const item = { id, name };
    this.afs.collection(this.getCollectionURL(coll)).doc(item.id).set({
      ...data,
      //author: this.afAuth.currentUser.uid,
      cusmterId: this.authState.uid,
      // authorName: this.afAuth.currentUser.displayName,
      // authorEmail: this.afAuth.currentUser.email,
      // authorPhoto: this.afAuth.currentUser.photoURL,
      // authorPhone: this.afAuth.currentUser.phoneNumber,
      Customer: this.authState.displayName,
      CustomerEmail: this.authState.email,
      CustomerPhoto: this.authState.photoURL,
      CustomerPhone: this.authState.phoneNumber,
      purhcasedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
    })

  /*
  const id = this.afs.createId();
  const item = { id, name };
  const timestamp = this.timestamp
  var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
  return docRef.set({
      ...data,
      //author: this.afAuth.currentUser.uid,
      author: this.authState.uid,
      // authorName: this.afAuth.currentUser.displayName,
      // authorEmail: this.afAuth.currentUser.email,
      // authorPhoto: this.afAuth.currentUser.photoURL,
      // authorPhone: this.afAuth.currentUser.phoneNumber,
      Customer: this.authState.displayName,
      authorEmail: this.authState.email,
      authorPhoto: this.authState.photoURL,
      authorPhone: this.authState.phoneNumber,
      purhcasedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
  })
  */
}

  updateDocs(coll:string,data:any,docId:any)
  { 
      console.log(data._id);
      console.log(coll)
      const id = this.afs.createId();
      const item = { id,name };
      const timestamp = this.timestamp;
      var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(data._id);
      return docRef.update({
        
        ...data,
        _id:id, 
        updatedAt:timestamp,
        authid: this.afAuth.auth.currentUser.uid,
        userName:this.afAuth.auth.currentUser.displayName,
        userEmail:this.afAuth.auth.currentUser.email


      })
  }



  deleteOneDocs(coll,data)
  {
    console.log("_id"+data)
     return (this.afs.collection(this.getCollectionURL(coll),ref => ref.where('_id', '==', data)
     .where('author','==',this.afAuth.auth.currentUser.uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const id = a.payload.doc.id;
          return  id ;
      })))
      .subscribe(docID=>{
        docID.map(a=>{
          console.log(a)
          return this.afs.collection(this.getCollectionURL(coll)).doc(a).delete();

        })
      })


     )
      
     // this.afs.collection(this.getCollectionURL(coll)).doc(getId)
     
  }

 addProduct(data,filter){

  if(filter =="add"){
    
    data.qty=data.qty+1
    }else{
        if(data.qty>0){
          data.qty =data.qty-1;
        }
    }



    /*
    var docRef= this.afs.collection(this.getCollectionURL('cart'),ref=>ref.where('_id', '==', data._id)
    .where('author','==',this.afAuth.auth.currentUser.uid)).snapshotChanges().pipe(
     map(actions => actions.map(a => {
         const id = a.payload.doc.id;
         return  id ;
     })))
     .subscribe(docID=>{
       docID.map(a=>{
         console.log(a)
         return this.afs.collection(this.getCollectionURL('cart')).doc(a).update({
          qty :data.qty,   

  
        })
  
       })
     })
   */
 }




}


