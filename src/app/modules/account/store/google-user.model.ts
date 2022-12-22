export class GoogleUser {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  givenName: string;
  lastName: string;
  authToken: string;

  idToken: string; // Reference https://developers.google.com/identity/sign-in/web/backend-auth
  authorizationCode: string; // Reference https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions

  response: any;
}
