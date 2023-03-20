import { SigninWithGoogle, SigninWithGoogleFail, SignoutWithGoogle } from "@account/store/account.actions";
import { AccountState } from "@account/store/account.state";
import { GoogleUser } from "@account/store/google-user.model";
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { CredentialResponse } from "google-one-tap";
import { Observable } from "rxjs";

@Component({
  // standalone: true,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @Select(AccountState.getGoogleUser)
  user$: Observable<GoogleUser>;
  user: GoogleUser | null;

  constructor(private store: Store,
              private router: Router) { }

  @HostListener('window:load')
  onLoad(): void {
    window.google.accounts.id.initialize({
      client_id: '334979481378-o30p8vigr8pma4sdod58qepl6ekk1k8b.apps.googleusercontent.com',
      auto_select: true,
      callback: (credential) => {
        this.handleCredentialResponse(credential);
      }
    });
    window.google.accounts.id.prompt();
  }

  ngOnInit(): void {
    this.user$.subscribe(user => this.user = user);
  }

  handleCredentialResponse(response: CredentialResponse): void {
    const user = this.decodeCredentialResponse(response);
    if (user) {
      this.store.dispatch(new SigninWithGoogle(user));
    } else {
      this.store.dispatch(new SigninWithGoogleFail('Login fail'));
    }
  }

  decodeCredentialResponse(response: CredentialResponse): GoogleUser | null {
    let decodedToken: any | null = null;
    try {
      decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
    } catch (e) {
      console.error('Error while trying to decode token', e);
    }
    if (!decodedToken) {
      return null;
    }
    return this.createSocialUser(decodedToken);
  }

  private createSocialUser(decodedToken: any): GoogleUser {
    const user = new GoogleUser();
    // user.id = decodedToken.sub;
    user.authToken = decodedToken.authToken;
    user.name = decodedToken.name;
    user.email = decodedToken.email;
    user.photoUrl = decodedToken.picture;
    user.givenName = decodedToken.given_name;
    user.lastName = decodedToken.family_name;
    return user;
  }

  logout(): void {
    window.google.accounts.id.disableAutoSelect();
    this.store.dispatch(new SignoutWithGoogle());
  }

  navigateToAccountProfile(): void {
    void this.router.navigate(['account']);
  }
}
