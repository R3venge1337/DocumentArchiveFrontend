import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig:AuthConfig =  {
    issuer: 'http://localhost:8080/realms/DocumentArchiveRealm',
    redirectUri: window.location.origin,
    clientId: 'DocumentArchiveAngularClient',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile email offline_access'
}