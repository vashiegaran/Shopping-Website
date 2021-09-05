import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,Routes } from '@angular/router';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './main/home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { SetProductComponent } from './set-product/set-product.component';

const routes:Routes=[

  {path:'',redirectTo: '/home', pathMatch:'full'},  
  {path:'home', component: HomeComponent},
  {path:'aboutus', component: AboutusComponent},
  {path:'merchant', component: SetProductComponent},

  {path:'settings', component: SettingsComponent},

  {path:'**',redirectTo: '/aboutus', pathMatch:'full'},

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
 
  exports:[RouterModule,],
  declarations: []
})
export class AppRoutingModule { }
