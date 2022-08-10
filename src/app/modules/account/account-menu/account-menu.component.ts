import { Component } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
  // account: Account;

  user: SocialUser;
  loggedIn = false;

  constructor(/*private accountService: AccountService,*/
              private authService: SocialAuthService) {
    // this.accountService.account.subscribe((account) => {
    //   this.account = account;
    //   this.loggedIn = account != null;
    // });
    this.authService.authState.subscribe((user) => {
      // console.log('AccountMenuComponent : ',)
      this.user = user;
      this.loggedIn = !user;
    });
  }

  loginWithGoogle(): void {
    const googleLoginOptions = {
      scope: 'profile email'
    };
    void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions)
    // .then((account) => {
    //   this.loggedIn = account != null;
    // });
  }

  logout(): void {
    // this.accountService.logout();
    this.authService.signOut(true).then(res => {
      console.log('AccountMenuComponent sign out: ', res)
    });
  }
}
