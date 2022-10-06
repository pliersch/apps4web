import { Component, OnInit } from '@angular/core';
import { SocialUser } from "@modules/google-signin/social-user.model";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AuthState } from "@modules/google-signin/store/auth.state";
import {
  LoginWithGoogleAction,
  LoginWithGoogleFailAction,
  LogoutWithGoogleAction
} from "@modules/google-signin/store/auth.actions";
import { CredentialResponse } from "google-one-tap";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @Select(AuthState.user)
  user$: Observable<SocialUser>;
  user: SocialUser | null;

  constructor(private store: Store) { }

  ngOnInit(): void {

    // this.user$.pipe(tap(user => this.user = user));
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

      /*      // OPTIONAL: In my case I want to redirect the user to an specific path.
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

  handleCredentialResponse(response: any): void {
    // const socialUser = this.createSocialUser(response.credential)
    const user = this.decodeCredentialResponse(response);
    // console.log('SigninComponent handleCredentialResponse: ', socialUser)
    if (user) {
      this.store.dispatch(new LoginWithGoogleAction(user));
    } else {
      this.store.dispatch(new LoginWithGoogleFailAction('Login fail'));
    }

  }

  decodeCredentialResponse(response: CredentialResponse): SocialUser | null {
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

  private createSocialUser(decodedToken: any): SocialUser {
    const user = new SocialUser();
    user.id = decodedToken.sub;
    user.name = decodedToken.name;
    user.email = decodedToken.email;
    user.photoUrl = decodedToken.picture;
    user.firstName = decodedToken.given_name;
    user.lastName = decodedToken.family_name;
    return user;
  }

  private decodeJwt(idToken: string): Record<string, string | undefined> {
    const base64Url = idToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  logout(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
    this.store.dispatch(new LogoutWithGoogleAction());
  }
}
