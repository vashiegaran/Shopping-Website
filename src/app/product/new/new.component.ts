import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

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

  dataLoading: boolean;
  querySubcription: any;
  savedChanges: boolean = false;;
  error: boolean;
  errorMessage: any;
  


  constructor(private _backendService :BackendService,private _location: Location) { }

  ngOnInit() {
  }

  upload(event) {    
    this.filePath = event.target.files[0]
    console.log(this.filePath)
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
  Back(){
    this._location.back();


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