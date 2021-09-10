import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterModule,Routes } from '@angular/router';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './main/home/home.component';
import { SetProductComponent } from './admin/set-product/set-product.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes:Routes=[

  {path:'',redirectTo: '/home', pathMatch:'full'},  
  {path:'home', component: HomeComponent,},
  {path:'aboutus', component: AboutusComponent},
  {path:'merchant', component: SetProductComponent,canActivate:[AuthGuardService]},
  {path:'cart', component: CartComponent,canActivate:[AuthGuardService]},
  {path:'login', component: LoginComponent},
  {path:'admin', component: AdmintabComponent ,canActivate:[AuthGuardAdminService] } ,
  {path:'purchase', component: PurchaseComponent ,canActivate:[AuthGuardService] } ,


  {path:'**',redirectTo: '', pathMatch:'full'},

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
