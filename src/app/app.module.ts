import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from 'src/app/app-modules/material-design.module';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { GetCreditComponent } from './components/get-credit/get-credit.component';
import { GetPersonalInformationComponent } from './components/get-credit/steps/get-personal-information/get-personal-information.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GetCreditComponent,
    GetPersonalInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } //dataPicker language
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
