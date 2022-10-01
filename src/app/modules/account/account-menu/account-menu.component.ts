import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Select, Store } from "@ngxs/store";
import {
  AutoLoginWithGoogleAction,
  LoginWithGoogleAction,
  LogoutWithGoogleAction
} from "@modules/account/store/auth.actions";
import { Observable } from "rxjs";
import { AuthState } from "@account/store/auth.state";

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {

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
