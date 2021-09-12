import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
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
  constructor(private _backendService:BackendService) { }

  ngOnInit() {
    this.getItemDetails();
  }


  getItemDetails(){


    //console.log(this._backendService.getCart('cart'))

    this.querySubcription =this._backendService.getYourItem('purchase')
    .subscribe(items =>{
      this.items = items;
      console.log("subscribe is working")
        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }


}
