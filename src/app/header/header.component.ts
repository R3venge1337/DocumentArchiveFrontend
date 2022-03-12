
import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { LocalStorageService } from 'ngx-localstorage';
import { authConfig } from '../auth-config';
import { DocumentService } from '../backend/document.service';
import { GeneratorPkceCredentialsService } from '../generator-pkce-credentials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  stateValue:string = '';
  codeVeriferValue:string = '';
  codeChallengeValue:string = '';


  constructor(private oauthService: OAuthService,
              private pkceService:GeneratorPkceCredentialsService,
              private _storageService: LocalStorageService,
              private documentService:DocumentService
              ){}
  
  ngOnInit(): void {
    this.configureSingleSignOn()
  }

  private configureSingleSignOn(){
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oauthService.initCodeFlow();
  }

  logout(){
    this.oauthService.logOut();
  }

  getBriefcase(){
    this.documentService.getBriefcase();
  }
  /*
  generateState(stateLength: number){
    this.stateValue = this.pkceService.generateState(stateLength);
    this._storageService.set('state', this.stateValue);
  }
  
  generateCodeVerifer(){
    this.codeVeriferValue = this.pkceService.generateCodeVerifer();
    this._storageService.set('codeVerifier',  this.codeVeriferValue);

  }
  
  generateCodeChallenge(){
    this.codeChallengeValue =  this.pkceService.generateCodeChallenge();
    this._storageService.set('codeChallenge',  this.codeChallengeValue);
  }

  getAuthorizationCode(){
    this.pkceService.getAuthorizationCode(this._storageService.get("state"),this._storageService.get("codeChallenge"));
  }

  getAccessToken(){
    this.pkceService.getAccessToken(this.codeChallengeValue,this._storageService.get("state"))
  }
  generateStateAndCodeAndVerifer(){
    this.pkceService.goToLoginPage();
  }
 */
 
}
