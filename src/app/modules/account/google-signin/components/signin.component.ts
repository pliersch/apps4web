import { Component, OnInit } from '@angular/core';
import { GoogleUser } from "@account/store/google-user.model";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  SigninWithGoogle,
  SigninWithGoogleFail,
  SignoutWithGoogle
} from "@account/store/signin.actions";
import { CredentialResponse } from "google-one-tap";
import { AccountState } from "@account/store/account.state";

@Component({
  // standalone: true,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @Select(AccountState.user)
  user$: Observable<GoogleUser>;
  user: GoogleUser | null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.user$.subscribe(user => this.user = user);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log('Google\'s One-tap sign in script loaded!');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: "334979481378-o30p8vigr8pma4sdod58qepl6ekk1k8b.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: true,
        cancel_on_tap_outside: false,
      });
      /*      // OPTIONAL
            // @ts-ignore
            google.accounts.id.prompt((notification: PromptMomentNotification) => {
              console.log('Google prompt event triggered...');

              if (notification.getDismissedReason() === 'credential_returned') {
                this.ngZone.run(() => {
                  this.router.navigate(['myapp/somewhere'], {replaceUrl: true});
                  console.log('Welcome back!');
                });
              }
            });*/
    };
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
    this.store.dispatch(new SignoutWithGoogle());
  }
}
