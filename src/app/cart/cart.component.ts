import { BackendService } from '../services/backend.service';
import { Component, ViewChild,AfterViewInit,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormGroup,FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CheckoutComponent } from '../checkout/checkout.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  @ViewChild(CheckoutComponent) cO;

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

  constructor(private _backendService:BackendService ,private router:Router) { }

  ngOnInit() {
    this.getCartDetails();
    console.log("working")
    this.counter=1;
  }

  test(){
    console.log("testing")
  }

  Back(){
    this.toggle=true
  }

  checkOut(page:string):void{
    console.log("checking out")
    let Link = new AppComponent(this.router,this._backendService);
    Link.goTo(page);
  }

  getCartDetails(){
    this.dataLoading = true;


    //console.log(this._backendService.getCart('cart'))
    console.log("carts")

    this.querySubcription =this._backendService.getYourItem('cart')
    .subscribe(carts =>{
      this.carts = carts;
  
      this.myDocData=carts;
      for (let i = 0; i <   this.carts.length; i++) {
        this.total = this.total+Number(this.carts[i].price*this.carts[i].qty)
      }
      console.log(carts)
        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  showDetails(item: any) {
    this.counter = 1;
    this.myDocData = item;
   // this.getPic(item.path);
    // capture user interest event, user has looked into product details
    this.dataLoading = true;
    let data = item;
    return this._backendService.updateShoppingInterest('interests',data).then((success)=> {
        this.dataLoading = false;
    });
}

  cartUpdate(data,quantity){
    console.log(data)
    this._backendService.updateCart('cart',data,quantity);
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

  countProd(filter: string,data:any){
  
    if(filter =="add"){
    
      data.qty=data.qty+1
      this.total = this.total+Number(data.price)
      }else{
          if(data.qty>1){
            data.qty =data.qty-1;
            this.total = this.total-Number(data.price)
  
          }
      }
      this.counter=data.qty;
      this.myDocData=data;
      this.total =this.total;
    //  this._backendService.addProduct(data,filter);
        console.log("this is working")
      
    
  
  }


  
deleteCart(data){ 
  console.log(data)
 console.log(" delete1 working")
 this.dataLoading = true;
this._backendService.deleteOneDocs('cart',data)

  }
}

