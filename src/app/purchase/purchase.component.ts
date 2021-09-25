import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  querySubcription:any;
  items:any[];
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  savedChanges: boolean;
  myDocData;
  constructor(private _backendService:BackendService,    private _location: Location
    ) { }
  listItem :any[];
  review:any[]
  rating;
  toggleField: string;

  ngOnInit() {
    this.getItemDetails();
    this.toggleField = "main";

  }
  
  Back(){
    this._location.back();

  }
  

  setData(formData,data){
    console.log(formData)
    this.listItem=formData;
    this.dataLoading = true;
    this.querySubcription =this._backendService.addReviewDoc('review',this.listItem,data)
        .then((res) =>{
          console.log("res is working fine")
          console.log("working"+res)
          this.savedChanges=true;
          this.dataLoading=false;

        }).catch(error=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        })
        
  }


  getItemDetails(){


    //console.log(this._backendService.getCart('cart'))

  }

  toggle(filter?) {
    this.dataLoading = false;
    if (!filter) { filter = "main" }
    else { filter = filter; }
    this.toggleField = filter;
}

showDetails(item) {
  this.myDocData = item;
  var date= new Date();
  // capture user interest event, user has looked into product details
  this.dataLoading = true;
  let data = item;
  return this._backendService.updateShoppingInterest('interests',data).then((success)=> {
      this.dataLoading = false;
  });
  
}


}
