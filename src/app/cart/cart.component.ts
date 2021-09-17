import { BackendService } from '../services/backend.service';
import { Component, ViewChild,AfterViewInit,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormGroup,FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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

  constructor(private _backendService:BackendService ,private router:Router) { }

  ngOnInit() {
    this.getCartDetails();
  }
  Back(){
    this.toggle=true
  }

  checkOut(page:string):void{
    let Link = new AppComponent(this.router);
    Link.goToPage(page);
  }

  getCartDetails(){
    this.dataLoading = true;


    //console.log(this._backendService.getCart('cart'))
    console.log(this.carts)

    this.querySubcription =this._backendService.getYourItem('cart')
    .subscribe(carts =>{
      this.carts = carts;
      console.log("subscribe is working")
        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  showDetails(item: any) {
    this.counter = 0;
    this.myDocData = item;
   // this.getPic(item.path);
    // capture user interest event, user has looked into product details
    this.dataLoading = true;
    let data = item;
    return this._backendService.updateShoppingInterest('interests',data).then((success)=> {
        this.dataLoading = false;
    });
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

  countProd(filter: string){
    if(filter =="add"){
  
      this.counter=this.counter+1;
  
    }else{
        if(this.counter>0){
          this.counter =this.counter-1;
        }
    }
  
  }


  
deleteCart(data){ 
  console.log(data)
 console.log(" delete1 working")
 this.dataLoading = true;
this._backendService.deleteOneDocs('cart',data)

  }
}

