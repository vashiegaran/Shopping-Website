import { Component, OnInit ,Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 @Input() pageTitle:string;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  link(page:string):void{
    let Link = new AppComponent(this.router);
    Link.goToPage(page);
  }
}
