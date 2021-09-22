import { Component, OnInit } from '@angular/core';
import{BackendService} from 'src/app/services/backend.service'
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  querySubcription: any;
  members: any[];
  error: boolean;
  errorMessage: any;

  constructor(private _backendService:BackendService ,private router:Router) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
  
    this.querySubcription =this._backendService.getDocs('wishlist')
        .subscribe(members =>{
          this.members = members;
           // console.log(this.members);
        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
        },
        ()=>{this.error=false;});

        
        
  }

  product(page:string,id:string):void{
    let Link = new AppComponent(this.router,this._backendService);
    Link.goToPage(page,id)
  }


}
