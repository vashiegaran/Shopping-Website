import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,ViewEncapsulation} from '@angular/core';
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
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetProductComponent } from './set-product/set-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import {OverlayModule} from '@angular/cdk/overlay';
firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SettingsComponent,
    SetProductComponent,
  

    
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
    

  
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {  }
