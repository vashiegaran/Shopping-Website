import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { BackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-product',
  templateUrl: './set-product.component.html',
  styleUrls: ['./set-product.component.scss']
})


export class SetProductComponent implements OnInit {

  category: Category[] = [
    {value: 'Fashion', viewValue: 'Fashion'},
    {value: 'Food', viewValue: 'Food'},
    {value: 'Electronics', viewValue: 'Electronics'}
  ];

  shipping: Shipping[] = [
    {value: 'GDex', viewValue: 'GDex'},
    {value: 'J&T Express', viewValue: 'J&T Express'},
    {value: 'TA-Q-BIN', viewValue: 'TA-Q-BIN'},
    {value: 'Citylink', viewValue: 'Citylink'},
    {value: 'FedEx', viewValue: 'FedEx'},
    {value: 'Pgeon', viewValue: 'Pgeon'},
    {value: 'Pos Laju', viewValue: 'Pos Laju'},
  ];
  
  filePath:string
  image:any;
  userProd:any[];
  savedChanges = false;
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  private querySubcription;
  dataSource: MatTableDataSource<any>;
  myDocData:any;
    toggleField: string;
    changePage: boolean =true;
  members: any[];
  //public form: FormGroup ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 // public userList : IUser[]=[];
  displayedColumns = [ 'category', 'name', 'price','_id'];

  constructor(private _backendService:BackendService,private _location: Location,private router:Router) { }
  upload(event) {    
    this.filePath = event.target.files[0]
    console.log(this.filePath)
  }
  
  Back(){
    this.toggle('main')
  }
  
  ngOnInit() {
    this.toggleField = "main";
    console.log(this.toggleField)



    
  }


  UploadProd(page:string,):void{
    let Link = new AppComponent(this.router,this._backendService);
    Link.goTo(page)
  }

  showDetails(item: any) {
    this.myDocData = item;
   // this.getPic(item.path);
    // capture user interest event, user has looked into product details
    this.dataLoading = true;
    let data = item;
    return this._backendService.updateShoppingInterest('product',data).then((success)=> {
        this.dataLoading = false;
    });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggle(filter?) {
    this.dataLoading = false;
    if (!filter) { filter = "main" }
    else { filter = filter; }
    this.toggleField = filter;
    console.log(this.toggleField)

}

  getData(){

    this.dataLoading = true;
    this.querySubcription =this._backendService.getDocs('product')
        .subscribe(members =>{
            this.members = members;
            this.dataSource=new MatTableDataSource(members);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;

        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  getUserProd(){

    
      this.dataLoading = true;
  

      //console.log(this._backendService.getCart('cart'))
      
      this.querySubcription =this._backendService.getYourItem('product')
      .subscribe(userProd =>{
        this.userProd = userProd;
        console.log("this is working"+this.userProd)
          },
  
          (error)=>{
            this.error=true;
            this.errorMessage=error.message;
            this.dataLoading=false;
          },
          ()=>{this.error=false; this.dataLoading=false});
          
    
  

  }

  
  setData(formData){
    console.log(formData)
    this.dataLoading = true;
    this.querySubcription =this._backendService.setNewDoc('product',formData,this.filePath)
        .then((res) =>{
          this.savedChanges=true;
          this.dataLoading=false;

        }).catch(error=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        })
        
  }
  

  updateData(formData){

    this.dataLoading = true;
    console.log("this data:"+formData)
    this.querySubcription =this._backendService.setDocs('product',formData);
       
     
  }

  getDoc(docId){
    this.dataLoading = true;
    console.log(docId)
    this.querySubcription =this._backendService.getOneProductDoc('product',docId)
        .subscribe(res =>{
      //    console.log(res)
          if(res){
         //   console.log(res);
            this.myDocData = res;
            console.log(this.myDocData.name)
            this.toggle('editMode');


          } else{
            console.log("not working")
          }
     

        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }



 
  deleteProd(data){ 
    console.log(data)
   console.log(" delete1 working")
   this.dataLoading = true;
  this._backendService.deleteOneDocs('product',data)

 }
  


 

}

interface Category {
  value: string;
  viewValue: string;
}

interface Shipping {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
})
export class Message {}

