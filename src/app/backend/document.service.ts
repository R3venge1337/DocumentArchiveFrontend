import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private _http: HttpClient,
    private oauthService: OAuthService
  ) { }

  getBriefcase() {
    this._http.get("http://localhost:56686/api/briefcase/2", {
      headers: {
        'Authorization': "Bearer "+ this.oauthService.getAccessToken(),
        'Access-Control-Allow-Origin': 'http://localhost:8081/',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      }
    }).subscribe(response => {
      console.log(response);
    })
  }
}
