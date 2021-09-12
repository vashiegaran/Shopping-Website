
import { Pipe, PipeTransform } from '@angular/core';
import { Component, ViewChild,AfterViewInit,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormGroup,FormsModule, Validators } from '@angular/forms';
import firebase = require("firebase");
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
  styleUrls: ['./home.component.scss']
})

export class HomeComponent  implements OnInit{


  savedChanges = false;
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  private querySubcription;
  dataSource: MatTableDataSource<any>;
  toppings :FormGroup;
  members: any[];
  carts :any[];
  counter=0;
  myDocData;
 // profileUrl :Observable<string |null>;
 profileUrl: String;
  //public form: FormGroup ;
  searchModel: string;

 // public userList : IUser[]=[];
 toggle: boolean =true;
 //public userDetails:IUser;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb:FormBuilder,private router:Router,
    private _backendService:BackendService,){
      
      this.toppings = fb.group({
      Fashion: false,
      Electronics: false,
      Food: false
    });
    }
 
    displayedColumns = [ 'category', 'name', 'price','_id'];


  ngOnInit(): void {
    //this.getUsers();
    //this.dataSource = new MatTableDataSource(this.members);
  //  this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
    this.getData();
   // this.getCartDetails();
  }
  getPic(picId){
    this.profileUrl="";
  }


  getData(){

    this.dataLoading = true;
    this.querySubcription =this._backendService.getDocs('product')
        .subscribe(members =>{
          this.members = members;
           // console.log(this.members);
        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  getCartDetails(){
    this.dataLoading = true;
    console.log(this._backendService.afAuth.auth.currentUser.uid)

    this.querySubcription =this._backendService.getYourItem('cart')
        .subscribe(carts =>{
          
          this.carts = carts;
          console.log(this.carts);
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


  showDetails(item) {
    this.counter = 0;
    this.myDocData = item;
    this.getPic(item.path);
    // capture user interest event, user has looked into product details
    this.dataLoading = true;
    let data = item;
    return this._backendService.updateShoppingInterest('interests',data).then((success)=> {
        this.dataLoading = false;
    });
    
}

  
countProd(filter){
  if(filter =="add"){

    this.counter=this.counter+1;

  }else{
      if(this.counter>0){
        this.counter =this.counter-1;
      }
  }

}

addToCart(item, counter){
  this.dataLoading = true;
  let data = item;
  data.qty = counter;
  return this._backendService.updateShoppingCart('cart',data).then((success)=> {
      this.dataLoading = false;
      this.counter=0;
      this.savedChanges=true;
  });
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


