import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'ngx-localstorage';
import { authConfig } from './auth-config';


@Injectable({
  providedIn: 'root'
})
export class GeneratorPkceCredentialsService {
  
  constructor(private storage: LocalStorageService,
              private _http: HttpClient, 
              private cookieService: CookieService) { }

  public clientId = 'DocumentArchiveAngularClient';
  public redirectUri = 'http://localhost:4200/';
  public tokenUrl = 'http://localhost:8080/realms/DocumentArchiveRealm/protocol/openid-connect/token';
  
  generateState(length: number){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("State: " + result);
    return result;
  }

  generateCodeVerifer(){
    const codeVerifier = this.generateState(128);
    console.log("codeVerifier:  " + codeVerifier);
    return codeVerifier;
  }

   generateCodeChallenge(){
    const codeVerifier = this.generateCodeVerifer()
    const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
    const codeChallenge = codeVerifierHash
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

   
    console.log("CodeChallengeValue: " + codeChallenge);
    return codeChallenge;
  }

  getAuthorizationCode(state:string, codechall:string){
    const params = [
      'response_type=code',
      'state=' + state,
      'client_id=' + 'DocumentArchiveAngularClient',
      'scope=openid',
      'code_challenge=' + codechall,
      'code_challenge_method=S256',
      'redirect_uri='+"http://localhost:4200",
  ];
  window.location.href = 'http://localhost:8080/realms/DocumentArchiveRealm/protocol/openid-connect/auth' + '?' + params.join('&');
  }

  goToLoginPage() {
    const state = this.generateState(40);
    const codeVerifier = this.generateState(128);
    this.storage.set('state', state);
    this.storage.set('codeVerifier', codeVerifier);
    const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
    const codeChallenge = codeVerifierHash
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
        
    const params = [
        'response_type=code',
        'state=' + state,
        'client_id=' + 'DocumentArchiveAngularClient',
        'scope=openid',
        'code_challenge=' + codeChallenge,
        'code_challenge_method=S256',
        'redirect_uri=' + 'http://localhost:4200',
    ];
    window.location.href ='http://localhost:8080/realms/DocumentArchiveRealm/protocol/openid-connect/auth' + '?' + params.join('&');
}

getAccessToken(code: string, state: string) {
  
  if (state !== this.storage.get('state')) {
      alert('Invalid state');
      return;
  }
  const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('code_verifier', this.storage.get('codeVerifier'))
      .append('redirect_uri', authConfig.redirectUri!)
      .append('client_id', authConfig.clientId!)
      .append('scope','openid');

  this._http.post(this.tokenUrl, payload, {
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization,Access-Control-Allow-Methods',
        'Content-Type':'application/x-www-form-urlencoded'
      }        
  }).subscribe(response => {
      console.log(response);
  });
}

  
}
