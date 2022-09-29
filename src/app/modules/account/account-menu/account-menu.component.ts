import { Component } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Select, Store } from "@ngxs/store";
import { LoginWithGoogleAction, LogoutWithGoogleAction } from "@modules/account/store/auth.actions";
import { Observable } from "rxjs";
import { AuthState } from "@account/store/auth.state";

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
  // account: Account;

  @Select(AuthState.user)
  user$: Observable<SocialUser>;
  // user: SocialUser;
  loggedIn = false;

  constructor(/*private accountService: AccountService,*/
              private store: Store) {

    // this.accountService.account.subscribe((account) => {
    //   this.account = account;
    //   this.loggedIn = account != null;
    // });
    //   this.authService.authState.subscribe((user) => {
    //     console.log('AccountMenuComponent : ', user)
    //     this.user = user;
    //     this.loggedIn = !user;
    //   });
  }

  loginWithGoogle(): void {
    this.store.dispatch(new LoginWithGoogleAction());
  }

  logout(): void {
    this.store.dispatch(new LogoutWithGoogleAction());
    // // this.accountService.logout();
    // this.authService.signOut(true).then(res => {
    //   console.log('AccountMenuComponent sign out: ', res)
    // });
  }
}
