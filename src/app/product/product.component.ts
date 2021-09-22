import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {
  date: Date;
  date2:Date;
  currentRate=0;
  savedChanges = false;
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  private querySubcription;

  members: any[];
  carts :any[];
  counter=0;
  dataId;
  myDocData;
  review;
  constructor(private _backendService:BackendService, private route:ActivatedRoute) { }


  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => this.dataId=params.prodId);
    this.myDocData = this._backendService.getOneProductDoc('product',this.dataId).subscribe(res =>{
      //    console.log(res)
          if(res){
         //   console.log(res);
            this.myDocData = res;


          } else{
            console.log("not working")
          }
     

        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
        },
        ()=>{this.error=false; });

        this.getReviewDetails(this.dataId)

    console.log(this.myDocData)
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

  addToWishlist(data){

    this._backendService.addWishList('wishlist',data);

  }

  getReviewDetails(id){
    this.querySubcription =this._backendService.getReview('review',id)
    .subscribe(review =>{
      
      this.review = review;
      console.log("this is working"+this.review);
    },

    (error)=>{
      this.error=true;
      this.errorMessage=error.message;
      this.dataLoading=false;
    },
    ()=>{this.error=false; this.dataLoading=false});

  }



}
