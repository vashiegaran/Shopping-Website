import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})


export class OrderComponent implements OnInit {
  querySubcription:any;
  items:any[];
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  savedChanges: boolean;
  myDocData;
  display;
  loop:number[];
  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.getItemDetails();
  }


  getItemDetails(){


    //console.log(this._backendService.getCart('cart'))
    this.querySubcription =this._backendService.getYourOrderItem('purchase')
    .subscribe(items =>{
      this.items = items;
      console.log(this.items)
        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  openModal(data) {
    console.log(data)
    this.myDocData=data;
    this.loop = this.myDocData.numOfProduct
    console.log(this.loop)
        this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  

 
}
