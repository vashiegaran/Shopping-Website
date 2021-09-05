import { Injectable } from '@angular/core';
import {path } from '@angular-devkit/core';
import {AngularFirestore} from '@angular/fire/firestore';
 

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor( private firestore: AngularFirestore) { }

  getUser(){return this.firestore.collection("User").snapshotChanges();}

  addUser(payload:IUser){return this.firestore.collection("User").add(payload);}
  updateUser(UserID:string,payload:IUser){return this.firestore.doc('User/'+UserID).update(payload)};

  
}


export interface IUser{

  id?: string;
  email : string;
  uid:string;
  
  }