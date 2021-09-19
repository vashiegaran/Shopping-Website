import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA,ViewEncapsulation} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import {  AuthServiceConfig, GoogleLoginProvider} from "angular-6-social-login";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import firebase = require('firebase');
import { AngularFirestore } from 'angularfire2/firestore';
import { AppRoutingModule } from './/app-routing.module';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { CustomaterialModule } from './/customaterial.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './main/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './login/login/login.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material'
import {MatChipsModule} from '@angular/material/chips';
import { AngularFireAuth } from '@angular/fire/auth';
import { SetProductComponent } from './admin/set-product/set-product.component';
import {MatBadgeModule} from '@angular/material/badge';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SearchPipe} from './search.pipe'
import { CartComponent } from './cart/cart.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { PurchaseComponent } from './purchase/purchase.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { SidebarModule } from 'ng-sidebar';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProdVerificationComponent } from './admin/prod-verification/prod-verification.component';


AngularFireModule.initializeApp({
  apiKey: "",
  authDomain: "",
  storageBucket: "",
  projectId: "",
}),
firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SetProductComponent,
    AdmintabComponent,
    SearchPipe,
    CartComponent,
    PurchaseComponent,
    CheckoutComponent,
    ProdVerificationComponent
    
    
    
    
    
    
  

    
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    FlexLayoutModule,
    NgbModule,
    FormsModule ,
    ReactiveFormsModule,
    AppRoutingModule,
    CustomaterialModule,
     MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule, 
    MatBadgeModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSidenavModule,
    MatSelectModule,
    AngularFireStorageModule,
    

    

  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [AngularFirestore,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {  }
