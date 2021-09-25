import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CartComponent } from '../cart/cart.component';
import { BackendService } from '../services/backend.service';
import {Location} from '@angular/common';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  carts:any[];
  members :any[];
  querySubcription: any;
  savedChanges = false;
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  myDocData: any;
  counter: number;
  showFiller = false;
  toggle: boolean =true;
  total=0;
  quantity=1;
  numOfProd:number;

  constructor(private _backendService:BackendService, private dialog:MatDialog, private _location: Location,private router:Router) { }
  count=0;
  ngOnInit() {
    this.getCartDetails();
  }

  countProd(filter,data){


   

  if(filter =="add"){
    
    data.qty=data.qty+1
    this.total = this.total+Number(data.price)
    }else{
        if(data.qty>0){
          data.qty =data.qty-1;
          this.total = this.total-Number(data.price)

        }
    }
    this.total =this.total+10;
  //  this._backendService.addProduct(data,filter);
      console.log("this is working")
    
  
  }

  link(page:string):void{
    let app= new AppComponent(this.router,this._backendService);
    app.goTo(page)
    
  }

  getProductData(item:any,counter){
    this.myDocData=item
    this.counter=counter
  }
  
  getCartDetails(){
    this.dataLoading = true;


    //console.log(this._backendService.getCart('cart'))
    console.log(this.carts)

    this.querySubcription =this._backendService.getYourItem('cart')
    .subscribe(carts =>{
      this.carts = carts;
      this.myDocData=carts;
      for (let i = 0; i <   this.carts.length; i++) {
        this.total = this.total+Number(this.carts[i].price*this.carts[i].qty)
        this.numOfProd=this.carts.length;
      }
      console.log("total price"+this.total)
    
      this.count=carts.length

        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  Back(){
    this._location.back();

  }
  


 alertUser(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

  purchaseProd(total,detail){
    console.log("purchase this prod")
    this.dataLoading = true;
  
    console.log(this.carts.length)
     this._backendService.updatePurchase('purchase',this.carts,total,detail,  this.numOfProd)

    
  }

  deleteCart(data){ 
    console.log(data)
   console.log(" delete1 working")
   this.dataLoading = true;
  this._backendService.deleteOneDocs('cart',data)
  
    }

}
