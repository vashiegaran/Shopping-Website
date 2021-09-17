import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
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

  constructor(private _backendService:BackendService) { }
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
  
  getCartDetails(){
    this.dataLoading = true;


    //console.log(this._backendService.getCart('cart'))
    console.log(this.carts)

    this.querySubcription =this._backendService.getYourItem('cart')
    .subscribe(carts =>{
      this.carts = carts;

      for (let i = 0; i <   this.carts.length; i++) {
        this.total = this.total+Number(this.carts[i].price*this.carts[i].qty)
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
  purchaseProd(total){
    this.dataLoading = true;
  
    console.log(this.carts.length)
    for(let x=0; x<this.carts.length;x++)
    {
       this._backendService.updatePurchase('purchase',this.carts[x],total)

    }
  }

}
