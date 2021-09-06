
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { BackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';
@Component({
  selector: 'app-admincarts',
  templateUrl: './admincarts.component.html',
  styleUrls: ['./admincarts.component.css']
})
export class AdmincartsComponent implements OnInit {

  savedChanges = false;
  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  private querySubcription;
  dataSource: MatTableDataSource<any>;
  myDocData:any;
    toggleField: string;

  members: any[];
  //public form: FormGroup ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 // public userList : IUser[]=[];
  toolgeField: string;
  displayedColumns = [ 'category','userId', 'name', 'price','_id'];

  constructor(private _backendService:BackendService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.toggleField = "searchMode";


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
    this.querySubcription =this._backendService.getProducts('cart')
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


  setData(formData){

    this.dataLoading = true;
    this.querySubcription =this._backendService.setProducts('cart',formData)
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

  updateData(formData){

    this.dataLoading = true;
    this.querySubcription =this._backendService.updateProduct('cart',formData)
        .subscribe(members =>{
          if(members){
            this.savedChanges = true;

          } 
     

        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});
        
  }

  getDoc(docId){
    this.dataLoading = true;
    this.querySubcription =this._backendService.getOneProductDoc('cart',docId)
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

  deleteDoc(docId){
    if (confirm("Are you sure want to delete this record ?")) {
      this.dataLoading = true;
    this.dataLoading = true;
    this.querySubcription =this._backendService.delOneProduct('cart',docId)
        .subscribe(res =>{
          if(res){
            this.myDocData = res;
            this.toggle('searchMode');


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

getFilterData(docId){

  this.dataLoading = true;
  this.querySubcription =this._backendService.getFilterProducts('cart',docId)
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

