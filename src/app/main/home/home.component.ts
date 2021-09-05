

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase = require("firebase");
import { FireBaseService,IUser } from './service/fire-base.service';
import _ = require('underscore');
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit{

  public form: FormGroup ;

  public userList : IUser[]=[];
  toolgeField: string;
  public userDetails:IUser;
  
  constructor(private fb:FormBuilder,private fireBaseService:FireBaseService,private router:Router){}



  ngOnInit(): void {
    this.toolgeField="";
    this.getUsers();
  }

  toggle(filter?){
    if(!filter) {filter="searchMode"}
    else {filter=filter}
    this.toolgeField = filter
  }
  link(page:string):void{
    let app= new AppComponent(this.router);
    app.goToPage(page)
    
  }

  getUsers():void{

    this.fireBaseService.getUser().subscribe((res)=>{
      this.userList = res.map((user)=>{

        return{
          ...user.payload.doc.data() as {},
          id: user.payload.doc['id']
        }as IUser;

      });
  });
}
  formInit(data:IUser):void{
    console.log(data);
    this.form=this.fb.group({
      ID:[data? data.uid:''],
      email:[data? data.email:'']
    
  });

  for (let i =0 ; i<this.userList.length;i++)
  {
    if(this.userList[i].uid==this.form.value.uid){
      console.log("User already exist")
    }else{
      this.fireBaseService.addUser(this.form.value)
    }

  }
  //this.fireBaseService.addUser(this.form.value)
  //console.log(this.userList[1].email);



}
 

public googleLogin(){

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
            .then(result =>{
                document.getElementById('Dashboard').style.display="block"
                document.getElementById('LoginScreen').style.display="none"

                this.ShowUserDetails(result.user);
               
                this.formInit(result.user);
            }).catch(console.log)

        
}

  public ShowUserDetails(user){
    document.getElementById('userDetails').innerHTML = `
    <p>0 uID: ${user.uid} </p> 
    <p>Name:  ${user.displayName}</p>
   
    `    
}
public LogoutUser(){

  const auth = firebase.auth;
  firebase.auth().signOut().then(()=>{
    
      document.getElementById('Dashboard').style.display="none"
      document.getElementById('LoginScreen').style.display="Block"

  }).catch(e=>{
      console.log(e)
  })

}




}


