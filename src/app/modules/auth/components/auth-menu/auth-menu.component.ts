import { Component } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { AuthState } from "@account/store/auth.state";
import { Observable } from "rxjs";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { AutoLoginWithGoogleAction, LoginWithGoogleAction, LogoutWithGoogleAction } from "@account/store/auth.actions";

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss']
})
export class AuthMenuComponent {

  @Select(AuthState.user)
  user$: Observable<SocialUser>;
  user: SocialUser | null;

  constructor(private authService: SocialAuthService,
              private store: Store) {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (!!user) {
        this.store.dispatch(new AutoLoginWithGoogleAction(user));
      }
    });
    this.store.select(AuthState.user).subscribe((user) => {
      this.user = user;
    });
  }

  loginWithGoogle(): void {
    this.store.dispatch(new LoginWithGoogleAction());
  }

  logout(): void {
    this.store.dispatch(new LogoutWithGoogleAction());
  }

}