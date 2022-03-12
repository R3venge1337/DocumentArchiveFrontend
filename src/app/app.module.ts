import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgxLocalStorageModule } from 'ngx-localstorage';



const routes :Routes =[
  {
    path: '',
    component: AppComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxLocalStorageModule.forRoot(),
    RouterModule.forRoot(routes),
    OAuthModule.forRoot({
     resourceServer: {
        allowedUrls: ["*"],
        sendAccessToken: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
