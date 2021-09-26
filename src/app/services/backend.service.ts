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
import { EventEmitter } from '@angular/core';



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
  emmiter : EventEmitter<any> = new EventEmitter();

  constructor(public afAuth:AngularFireAuth ,private afs :AngularFirestore,private afStorage: AngularFireStorage) {

    this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    });
   }


   /* Return only one value based on document ID*/

  getDoc(callUrl:string){
      this.itemDoc= this.afs.doc<any>(callUrl);
      return this.itemDoc.valueChanges();
  }

     /* Return only one value based on document ID*/


  getDocs(coll:string,filters?:any){
    this.itemCollection = this.afs.collection<any>(this.getCollectionURL(coll));
    return this.itemCollection.valueChanges();
  }

       /* Return product that is not approved by ADMIN */


  getPendingProd(coll:string,filters?:any){
    this.itemCollection = this.afs.collection<any>(this.getCollectionURL(coll),ref=>
    ref.where('status','==','Pending'))
    return this.itemCollection.valueChanges();
  }

  /*return user authentication */

  isUserLoggedIn(){
    return Observable.from(this.afAuth.authState)
    .take(1)
    .map(state => !!state)
    .do(authenticated=>{

      return authenticated;
    });

  }
   /*return boolean isAdmin true or false */

  isUserAdmin(){
      console.log('working admin')
      console.log(this.afAuth.auth.currentUser.uid)
    let collUrl = !this.isUserLoggedin()? "nouser" :this.afAuth.auth.currentUser.uid;
    collUrl = "/OnlineStore/Store/admins/"+collUrl;
    return this.getDoc(collUrl);
  }

  isUserLoggedin(){
    return this.afAuth.authState;

  }

   /*Save user details */

  saveUserData(coll,user){
    console.log("user info")

    this.afs.collection(this.getCollectionURL(coll),ref=>
    ref.where('UID','==',user.uid)).snapshotChanges().subscribe(res => {
      if (res.length > 0)
      {
      console.log("Data exist.");
      }
      else
      {
        var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(user.uid).set({

          Username: user.displayName,
          Useremail: user.email,
          PhoneNumber: user.phoneNumber,
          UID:user.uid,
          Address: null,
    
        })
      }
  });

  


  }
 
   /*Admin Approve or reject product */

  approveStatus(coll:string,data,app:string){

    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(data._id);
    return docRef.update({
      
      status:app,


    })

  }

     /*Login api */

  
  login(loginType,formData?){
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    
    if(formData){
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email
        ,formData.password);
    }else{
      let loginMethod;
        if(loginType == "GOOGLE" ){loginMethod = new firebase.auth.GoogleAuthProvider() }
        else if(loginType == "FB" ){console.log("facebook");loginMethod = new firebase.auth.FacebookAuthProvider() }
        else if(loginType == "GITHUB" ){loginMethod = new firebase.auth.GithubAuthProvider() }
        else if(loginType == "NUMBER" ){console.log("Number is triggered");loginMethod = new firebase.auth.PhoneAuthProvider() }


      return this.afAuth.auth.signInWithRedirect(loginMethod);
      
    }
  
  
  }

       /*Return customers' product based on User ID*/

  getYourItem(coll) {
    console.log(this.afAuth.auth.currentUser.uid)
    this.cartColletion = this.afs.collection<any>(this.getCollectionURL(coll),ref=>
    ref.where('customerId','==',this.afAuth.auth.currentUser.uid)
    )
    return this.cartColletion.valueChanges();
  
}

  getYourOrderItem(coll) {
    console.log(this.afAuth.auth.currentUser.uid)
    this.cartColletion = this.afs.collection<any>(this.getCollectionURL(coll),ref=>
    ref.where('cusmterId','==',this.afAuth.auth.currentUser.uid)
    )
    return this.cartColletion.valueChanges();

  }

       /*Return review comments based on Item ID*/


  getReview(coll,id) {

        
        return this.afs.collection(this.getCollectionURL(coll),ref=>
        ref.where('itemId','==',id)  
        ).valueChanges();

  }
       /*API logout*/


  logout(){
    return this.afAuth.auth.signOut();
  }






  get timestamp(){
    var d =new Date();
    return d;

  }

  getCollectionURL(filter){
    return "/OnlineStore/Store/" +filter;
  }

         /*Add Review comments into review database*/


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

           /*Add product to wishlist if only product does'nt exist in wishlist*/


  addWishList(coll,data){
    const id = this.afs.createId();
    const item = { id,name };
    const timestamp = this.timestamp;


   return  this.afs.collection(this.getCollectionURL(coll),ref=>
    ref.where('author','==',data.author)).snapshotChanges().subscribe(res => {
      if (res.length > 0)
      {
      console.log("Data exist.");
      }
      else
      {
        return this.afs.collection(this.getCollectionURL(coll)).doc(item.id).set({
          ...data,
          updatedAt: timestamp,
          createdAt: timestamp,
          delete_flag: "N",
          CustomerId: this.afAuth.auth.currentUser.uid,
          Customername: this.afAuth.auth.currentUser.displayName,
    
        })
      }
  });



    



  }


             /*Upload Product into the database*/

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
        customerId:this.afAuth.auth.currentUser.uid,
        status:"Pending",
        
        
    });
  });    
}

             /*Update Product into the existing documents*/

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


             /*Get one  product based on Product ID*/

  getOneProductDoc(_collType,docId){
   return this.afs.collection(this.getCollectionURL(_collType)).doc(docId).valueChanges();
  
    
  }

  getPurchasedProd(_collType,data){
      this.itemCollection = this.afs.collection<any>(this.getCollectionURL(_collType),ref=>
      ref.where('OrderID','==',data.OrderID))
      return this.itemCollection.valueChanges();
    }
   
     
   
  

               /*Dummy method*/

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


               /*Upload Your shopping cart*/

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

               /*Upload Your Purchase list*/


updatePurchase(coll: string, data,total,detail,numOfProd){

  const timestamp = this.timestamp


    
    const id = this.afs.createId();
    const OrderID = this.afs.createId();
  const item = { id, name };
    this.afs.collection(this.getCollectionURL(coll)).doc(item.id).set({
      ...data,
      ...detail,
      OrderID:"OID"+OrderID,
      numOfProduct:numOfProd,
      //author: this.afAuth.currentUser.uid,
      cusmterId: this.authState.uid,
      // authorName: this.afAuth.currentUser.displayName,
      // authorEmail: this.afAuth.currentUser.email,
      // authorPhoto: this.afAuth.currentUser.photoURL,
      // authorPhone: this.afAuth.currentUser.phoneNumber,
      Total:total,
      Customer: this.authState.displayName,
      CustomerEmail: this.authState.email,
      CustomerPhoto: this.authState.photoURL,
      CustomerPhone: this.authState.phoneNumber,
      purchasedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
      status:"Sold"
    })


}



  

  updateUser(coll:string,data:any,docId:any)
  { 
     console.log(data)
      var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(docId);
      return docRef.update({
        
        ...data,
     


      })
  }

                 /*Update Your shopping cart inside checkout Page*/


  updateCart(coll:string,data:any,quantity)
  { 
    var docRef= this.afs.collection(this.getCollectionURL(coll),ref=>ref.where('_id', '==', data._id)).snapshotChanges().pipe(
     map(actions => actions.map(a => {
         const id = a.payload.doc.id;
         return  id ;
     })))
     .subscribe(docID=>{
       docID.map(a=>{
         console.log(a)
         return this.afs.collection(this.getCollectionURL(coll)).doc(a).update({
          qty:quantity,
       
  
        })

       })
     })

  }

  


                 /*Delete document*/


  deleteOneDocs(coll,data)
  {
    console.log("_id"+data)
     return (this.afs.collection(this.getCollectionURL(coll),ref => ref.where('_id', '==', data)
     .where('customerId','==',this.afAuth.auth.currentUser.uid)).snapshotChanges().pipe(
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

 




}


