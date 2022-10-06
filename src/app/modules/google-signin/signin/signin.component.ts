import { Component, OnInit } from '@angular/core';
import { SocialUser } from "@modules/google-signin/social-user.model";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AuthState } from "@modules/google-signin/store/auth.state";
import { LoginWithGoogleAction } from "@modules/google-signin/store/auth.actions";

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log('Google\'s One-tap sign in script loaded!');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      google.accounts.id.initialize({
        // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
        client_id: "334979481378-o30p8vigr8pma4sdod58qepl6ekk1k8b.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
        auto_select: true,
        cancel_on_tap_outside: false
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

    /*    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.handleCredentialResponse = (response) => {
          const socialUser = this.createSocialUser(response.credential);
          console.log('SigninComponent handleCredentialResponse: ', socialUser)
          this.store.dispatch(new LoginWithGoogleAction(socialUser));
        }*/
    // this.loadScript();
  }

  handleCredentialResponse(response: any): void {
    const socialUser = this.createSocialUser(response.credential);
    console.log('SigninComponent handleCredentialResponse: ', socialUser)
    this.store.dispatch(new LoginWithGoogleAction(socialUser));
  }

  // loadScript(): void {
  //   const meta = document.createElement('meta');
  //   meta.name = "google-signin-client_id";
  //   meta.content = "334979481378-o30p8vigr8pma4sdod58qepl6ekk1k8b.apps.googleusercontent.com";
  //   document.getElementsByTagName('head')[0].appendChild(meta);
  //
  //   const script = document.createElement('script');
  //   script.async = true;
  //   script.src = 'https://accounts.google.com/gsi/client';
  //   document.head.appendChild(script);
  //   console.log('SigninComponent loadScript: loaded',)
  // }

  private createSocialUser(idToken: string): SocialUser {
    const user = new SocialUser();
    user.idToken = idToken;
    const payload = this.decodeJwt(idToken);
    user.id = payload.sub || '-1';
    user.name = payload.name || 'Nope';
    user.email = payload.email || 'Nope';
    user.photoUrl = payload.picture || 'Nope';
    user.firstName = payload['given_name'] || 'Nope';
    user.lastName = payload['family_name'] || 'Nope';
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

  }
}
