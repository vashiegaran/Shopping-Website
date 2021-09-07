import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  toggle: boolean =true;
  savedChanges =false;
  error:boolean=false;
  errorMessage: String ="";
  dataLoading : boolean =false;
  private querySubcription;
  members: Observable<any>;
  counter=0
  myDocData;
 // profileUrl :Observable<string |null>;
 profileUrl: String;
  paginator: any;
  sort: any;
  
  constructor(private _backendService:BackendService) { }

  ngOnInit() {
    this.getData();
  }

  getFilterData(filter){

    this.dataLoading = true;
    this.querySubcription =this._backendService.getFilterProducts('product',filter)
        .subscribe(members =>{
          if(members){
            this.members = members;
            this.dataLoading=false;
  
  
          } 
     
  
        },
  
        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
  }

  getData(){

    this.dataLoading = true;
    this.querySubcription =this._backendService.getProducts('product')
        .subscribe(members =>{
          if(members){
            this.members = members;
            this.dataLoading=false;
  
  
          } 
     
  
        },
  
        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
  }

  getPic(picId){
    this.profileUrl="";
  }

  ShowDetails(item){
    this.counter=0;
    this.myDocData = item;
    this.getPic(item.path);
    this.dataLoading=true;
    let data = item;
 

    this.dataLoading = true;
    this.querySubcription =this._backendService.updateShoppingInterest('product',item)
        .subscribe(members =>{
          if(members){
            this.members = members;
            this.dataLoading=false;
            this.savedChanges=true;
  
  
          } 
     
  
        },
  
        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});

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

  addTocart(item,counter){

    this.dataLoading=true;
    let data = item;
    data.qty=counter;

    this.querySubcription =this._backendService.updateShoppingCart('interests',data)
        .subscribe(members =>{
          if(members){
            this.savedChanges = true;
            this.dataLoading=false;
            this.counter=0;

  
  
          } 
     
  
        },
  
        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});


  }


}
