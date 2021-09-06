

import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase = require("firebase");
import { FireBaseService,IUser } from './service/fire-base.service';
import _ = require('underscore');
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TouchSequence } from 'selenium-webdriver';
import{BackendService} from 'src/app/services/backend.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit{

  savedChanges = false;
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  private querySubcription;
  dataSource: MatTableDataSource<any>;

  members: any[];
  //public form: FormGroup ;

 // public userList : IUser[]=[];
  toolgeField: string;
  //public userDetails:IUser;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb:FormBuilder,private fireBaseService:FireBaseService,private router:Router,
    private _backendService:BackendService){}

    displayedColumns = [ 'category', 'name', 'price','_id'];


  ngOnInit(): void {
    this.toolgeField="";
    //this.getUsers();
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }


  getData(){

    this.dataLoading = true;
    this.querySubcription =this._backendService.getProducts('product')
        .subscribe(members =>{
            this.members = members;
            this.dataSource=new MatTableDataSource(members);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;


        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



/*
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



*/
}


