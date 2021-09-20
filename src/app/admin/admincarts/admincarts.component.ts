
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { BackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-admincarts',
  templateUrl: './admincarts.component.html',
  styleUrls: ['./admincarts.component.scss']
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
 

  constructor(private _backendService:BackendService, private dialog: MatDialog) { }

  ngOnInit() {
    
    this.getData();

  }

  getData(){
  
    this.dataLoading = true;
    this.querySubcription =this._backendService.getDocs('cart')
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


alertUser(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

}

