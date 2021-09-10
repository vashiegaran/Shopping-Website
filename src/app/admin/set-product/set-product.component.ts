import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { BackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';

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

  userProd:any;
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
  toolgeField: string;
  displayedColumns = [ 'category', 'name', 'price','_id'];

  constructor(private _backendService:BackendService) { }

  ngOnInit() {
    this.getUserProd();
    this.toggleField = "searchMode";


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
    if (!filter) { filter = "searchMode" }
    else { filter = filter; }
    this.toggleField = filter;
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
      console.log(this.userProd)
  
      this.querySubcription =this._backendService.getUserProd('product')
      .subscribe(userProd =>{
        this.userProd = userProd;
        console.log("User prod is working")
          },
  
          (error)=>{
            this.error=true;
            this.errorMessage=error.message;
            this.dataLoading=false;
          },
          ()=>{this.error=false; this.dataLoading=false});
          
    
  

  }

  setData(formData){

    this.dataLoading = true;
    this.querySubcription =this._backendService.setDocs('product',formData)
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
    console.log(formData)
    this.querySubcription =this._backendService.updateProduct('product',formData)
        .then((res) =>{
            this.savedChanges=true;
            this.dataLoading=false;
  
          }).catch(error=>{
            this.error=true;
            this.errorMessage=error.message;
            this.dataLoading=false;
          })
          
     
  }

  getDoc(docId){
    this.dataLoading = true;
    console.log(docId)
    this.querySubcription =this._backendService.getOneProductDoc('product',docId)
        .subscribe(res =>{
          if(res){
            console.log("res is working");
            this.myDocData = res;
            console.log(this.myDocData)
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



/*
  deleteDoc(docId){
    if (confirm("Are you sure want to delete this record ?")) {
      this.dataLoading = true;
    this.dataLoading = true;
    this.querySubcription =this._backendService.deleteOneDocs('product',docId)
    .subscribe(res =>{
      if(res){
        this.myDocData = res;
        this.toggle('editMode');


      } 
 

    },

    (error)=>{
      this.error=true;
      this.errorMessage=error.message;
      this.dataLoading=false;
    },
    ()=>{this.error=false; this.dataLoading=false});
        
  }
}
*/
getFilterData(docId){

  this.dataLoading = true;
  this.querySubcription =this._backendService.getFilterProducts('product',docId)
      .subscribe(members =>{
        if(members){
          this.members = members;
          this.dataSource=new MatTableDataSource(members);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
        } 
   

      },

      (error)=>{
        this.error=true;
        this.errorMessage=error.message;
        this.dataLoading=false;
      },
      ()=>{this.error=false; this.dataLoading=false});
}


 

}

interface Category {
  value: string;
  viewValue: string;
}


