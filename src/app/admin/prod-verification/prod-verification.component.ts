import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import{BackendService} from 'src/app/services/backend.service'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-prod-verification',
  templateUrl: './prod-verification.component.html',
  styleUrls: ['./prod-verification.component.scss']
})


export class ProdVerificationComponent implements OnInit {

  error: boolean = false;
  errorMessage :String = "";
  dataLoading : boolean= false;
  private querySubcription;
  savedChanges:boolean=false;
  members: any[];

  constructor( private _backendService:BackendService,    private dialog: MatDialog
    ) { }

alertUser(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

  ngOnInit() {
    this.getData();
  }


  getData(){
  
    this.querySubcription =this._backendService.getPendingProd('product')
        .subscribe(members =>{
       //   console.log(members)
          this.members = members;
           console.log(this.members);
        },

        (error)=>{
          this.error=true;
          this.errorMessage=error.message;
          this.dataLoading=false;
        },
        ()=>{this.error=false; this.dataLoading=false});

        
        
  }

  Approval(data,app:string){

    this._backendService.approveStatus('product',data,app).then((success)=>{

      this.savedChanges=true;

    });

  }

}
